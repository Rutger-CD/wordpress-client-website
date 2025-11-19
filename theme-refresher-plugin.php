<?php
/**
 * Plugin Name: Theme Cache Refresher
 * Description: Clears theme cache and forces WordPress to detect new themes
 * Version: 1.0
 * Author: Deployment Script
 */

// Add admin menu
add_action('admin_menu', 'tcr_add_admin_menu');

function tcr_add_admin_menu() {
    add_management_page(
        'Theme Refresher',
        'Theme Refresher',
        'manage_options',
        'theme-refresher',
        'tcr_admin_page'
    );
}

// Admin page
function tcr_admin_page() {
    ?>
    <div class="wrap">
        <h1>Theme Cache Refresher</h1>

        <?php
        if (isset($_POST['refresh_themes'])) {
            // Clear all theme-related transients
            delete_transient('theme_roots');
            delete_site_transient('theme_roots');
            delete_transient('update_themes');
            delete_site_transient('update_themes');

            // Force search_theme_directories to run
            search_theme_directories(true);

            // Clear object cache
            wp_cache_delete('themes', 'themes');

            echo '<div class="notice notice-success"><p><strong>✅ Theme cache cleared!</strong></p></div>';
            echo '<div class="notice notice-info"><p>Go to <a href="' . admin_url('themes.php') . '">Appearance → Themes</a> to see all themes.</p></div>';
        }
        ?>

        <div class="card" style="max-width: 600px; margin-top: 20px;">
            <h2>Clear Theme Cache</h2>
            <p>Click the button below to force WordPress to scan for all available themes.</p>

            <form method="post">
                <p>
                    <button type="submit" name="refresh_themes" class="button button-primary button-large">
                        🔄 Refresh Theme List
                    </button>
                </p>
            </form>
        </div>

        <div class="card" style="max-width: 600px; margin-top: 20px;">
            <h2>Current Themes</h2>
            <p>WordPress currently detects these themes:</p>
            <ul>
            <?php
            $themes = wp_get_themes();
            foreach ($themes as $theme_slug => $theme) {
                $errors = $theme->errors();
                $status = $errors ? ' ⚠️ <em>(has errors)</em>' : ' ✅';
                echo '<li><strong>' . esc_html($theme->get('Name')) . '</strong> (' . esc_html($theme_slug) . ')' . $status . '</li>';
            }
            ?>
            </ul>
        </div>
    </div>
    <?php
}

// Also run on plugin activation
register_activation_hook(__FILE__, function() {
    delete_transient('theme_roots');
    delete_site_transient('theme_roots');
    delete_transient('update_themes');
    delete_site_transient('update_themes');
    search_theme_directories(true);
});
