/**
 * Create Linear Issues for Database Sync Setup
 *
 * Creates issues for setting up database synchronization between:
 * 1. Production → Staging/Development (for fresh data)
 * 2. Staging → Production (to push changes live)
 */

const { LINEAR_API_KEY } = require('./load-env.js');
const LINEAR_API_URL = 'https://api.linear.app/graphql';

async function createDatabaseSyncIssues() {
	console.log('📋 Creating Linear issues for database sync setup...\n');

	try {
		// First, get the project and team info
		const getProjectQuery = `
			query {
				projects(filter: { name: { contains: "WordPress" } }) {
					nodes {
						id
						name
						teams {
							nodes {
								id
								name
							}
						}
					}
				}
				workflowStates(filter: { name: { eq: "Todo" } }) {
					nodes {
						id
						name
					}
				}
			}
		`;

		const getProjectResponse = await fetch(LINEAR_API_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `${LINEAR_API_KEY}`
			},
			body: JSON.stringify({ query: getProjectQuery })
		});

		const getProjectData = await getProjectResponse.json();

		if (getProjectData.errors) {
			throw new Error(`Linear API error: ${JSON.stringify(getProjectData.errors)}`);
		}

		const project = getProjectData.data.projects.nodes[0];
		const team = project.teams.nodes[0];
		const todoState = getProjectData.data.workflowStates.nodes.find(s => s.name === 'Todo');

		console.log(`✓ Project: ${project.name} (${project.id})`);
		console.log(`✓ Team: ${team.name} (${team.id})`);
		console.log(`✓ Todo State: ${todoState.name} (${todoState.id})\n`);

		// Issue 1: Production → Staging/Development Sync
		console.log('Creating Issue 1: Production → Staging/Development...');

		const issue1Mutation = `
			mutation {
				issueCreate(input: {
					title: "Database Sync: Production → Staging/Development"
					description: "## Overview\\nSet up automated workflow to sync production database to staging and development environments, allowing developers to work with the latest production data.\\n\\n## Requirements\\n\\n### Technical Implementation\\n- Create GitHub Actions workflow or manual script for database export/import\\n- Use WP-CLI for WordPress-specific database operations\\n- Handle database prefix changes if necessary (wp_ vs wpdev_)\\n- Export production database with wp_posts, wp_users, wp_options, etc.\\n- Import to staging and development environments\\n- Update site URLs in database after import (production URLs → staging/dev URLs)\\n\\n### WordPress Considerations\\n- Use \`wp db export\` for clean database exports\\n- Use \`wp search-replace\` to update URLs after import\\n- Handle serialized data correctly (wp_options, wp_postmeta)\\n- Preserve wp-config.php settings (don't overwrite)\\n- Skip wp-content/uploads if only database sync needed\\n\\n### Security\\n- Secure database credentials storage (GitHub Secrets)\\n- SFTP/SSH access for database files\\n- Sanitize sensitive data if needed (emails, API keys)\\n- Restrict access to production database\\n\\n### Commands Reference\\n\`\`\`bash\\n# Export production database\\nwp db export production-backup.sql --path=/path/to/wordpress\\n\\n# Import to staging\\nwp db import production-backup.sql --path=/path/to/staging\\n\\n# Update URLs\\nwp search-replace 'https://wp-base.rutgerthus.nl' 'https://staging.rutgerthus.nl' --path=/path/to/staging\\n\\n# Update home and siteurl\\nwp option update home 'https://staging.rutgerthus.nl' --path=/path/to/staging\\nwp option update siteurl 'https://staging.rutgerthus.nl' --path=/path/to/staging\\n\`\`\`\\n\\n## Acceptance Criteria\\n- [ ] Database can be exported from production\\n- [ ] Database can be imported to staging environment\\n- [ ] Database can be imported to development environment\\n- [ ] URLs are automatically updated after import\\n- [ ] WordPress site works correctly after sync\\n- [ ] Process is documented with clear instructions\\n- [ ] GitHub Actions workflow OR manual script is created\\n- [ ] Sensitive data handling is addressed\\n\\n## Notes\\n- Consider backup retention policy\\n- Test thoroughly on staging before development\\n- May need to handle user passwords/sessions\\n- wp-content/uploads sync is separate concern"
					teamId: "${team.id}"
					projectId: "${project.id}"
					stateId: "${todoState.id}"
					priority: 2
				}) {
					success
					issue {
						id
						identifier
						title
						url
					}
				}
			}
		`;

		const issue1Response = await fetch(LINEAR_API_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `${LINEAR_API_KEY}`
			},
			body: JSON.stringify({ query: issue1Mutation })
		});

		const issue1Data = await issue1Response.json();

		if (issue1Data.errors) {
			throw new Error(`Linear API error: ${JSON.stringify(issue1Data.errors)}`);
		}

		const issue1 = issue1Data.data.issueCreate.issue;
		console.log(`✓ Created: ${issue1.identifier} - ${issue1.title}`);
		console.log(`  URL: ${issue1.url}\n`);

		// Issue 2: Staging → Production Sync
		console.log('Creating Issue 2: Staging → Production...');

		const issue2Mutation = `
			mutation {
				issueCreate(input: {
					title: "Database Sync: Staging → Production"
					description: "## Overview\\nSet up controlled workflow to sync staging database changes to production, enabling content updates and configuration changes to be pushed live.\\n\\n## Requirements\\n\\n### Technical Implementation\\n- Create manual approval workflow (GitHub Actions with environment protection)\\n- Export staging database with WP-CLI\\n- Import to production with safety checks\\n- Update site URLs after import (staging URLs → production URLs)\\n- Create automatic backup before production import\\n- Rollback capability if import fails\\n\\n### WordPress Considerations\\n- Use \`wp db export\` for clean database exports\\n- Use \`wp search-replace\` to update URLs after import\\n- Verify serialized data integrity (wp_options, wp_postmeta)\\n- Preserve production-specific wp-config.php settings\\n- Handle production-only plugins/settings\\n\\n### Safety & Validation\\n- **CRITICAL**: Require manual approval before production sync\\n- Create timestamped backup before any production database change\\n- Validate database integrity after import\\n- Test production site functionality post-import\\n- Have rollback procedure documented\\n- Notification system for sync completion/failure\\n\\n### Commands Reference\\n\`\`\`bash\\n# Backup production database first (CRITICAL)\\nwp db export \\"production-backup-$(date +%Y%m%d-%H%M%S).sql\\" --path=/path/to/wordpress\\n\\n# Export staging database\\nwp db export staging-export.sql --path=/path/to/staging\\n\\n# Import to production (after backup!)\\nwp db import staging-export.sql --path=/path/to/wordpress\\n\\n# Update URLs to production\\nwp search-replace 'https://staging.rutgerthus.nl' 'https://wp-base.rutgerthus.nl' --path=/path/to/wordpress\\n\\n# Update home and siteurl\\nwp option update home 'https://wp-base.rutgerthus.nl' --path=/path/to/wordpress\\nwp option update siteurl 'https://wp-base.rutgerthus.nl' --path=/path/to/wordpress\\n\\n# Verify site health\\nwp core verify-checksums --path=/path/to/wordpress\\n\`\`\`\\n\\n### Rollback Procedure\\n\`\`\`bash\\n# If import fails, restore from backup\\nwp db import production-backup-TIMESTAMP.sql --path=/path/to/wordpress\\n\`\`\`\\n\\n## Acceptance Criteria\\n- [ ] Manual approval required before production sync\\n- [ ] Automatic backup created before import\\n- [ ] Database can be exported from staging\\n- [ ] Database can be imported to production\\n- [ ] URLs are automatically updated after import\\n- [ ] Production site works correctly after sync\\n- [ ] Rollback procedure is tested and documented\\n- [ ] GitHub Actions workflow with protected environment\\n- [ ] Notifications sent on sync completion/failure\\n- [ ] Backup retention policy implemented\\n\\n## Safety Checklist\\n- [ ] Backup before sync: MANDATORY\\n- [ ] Manual approval: REQUIRED\\n- [ ] Test on staging first: ALWAYS\\n- [ ] Rollback plan: DOCUMENTED\\n- [ ] Stakeholder notification: CONFIGURED\\n\\n## Notes\\n- This is HIGH RISK operation on production\\n- Always test sync process on staging → development first\\n- Consider maintenance mode during sync\\n- Keep backups for at least 30 days\\n- Document any production-specific settings that shouldn't be overwritten"
					teamId: "${team.id}"
					projectId: "${project.id}"
					stateId: "${todoState.id}"
					priority: 1
				}) {
					success
					issue {
						id
						identifier
						title
						url
					}
				}
			}
		`;

		const issue2Response = await fetch(LINEAR_API_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `${LINEAR_API_KEY}`
			},
			body: JSON.stringify({ query: issue2Mutation })
		});

		const issue2Data = await issue2Response.json();

		if (issue2Data.errors) {
			throw new Error(`Linear API error: ${JSON.stringify(issue2Data.errors)}`);
		}

		const issue2 = issue2Data.data.issueCreate.issue;
		console.log(`✓ Created: ${issue2.identifier} - ${issue2.title}`);
		console.log(`  URL: ${issue2.url}\n`);

		// Issue 3: Database Sync Documentation & Testing
		console.log('Creating Issue 3: Documentation & Testing...');

		const issue3Mutation = `
			mutation {
				issueCreate(input: {
					title: "Database Sync: Documentation & Testing"
					description: "## Overview\\nCreate comprehensive documentation and testing procedures for database synchronization workflows between all environments.\\n\\n## Requirements\\n\\n### Documentation\\n- Step-by-step guide for production → staging/development sync\\n- Step-by-step guide for staging → production sync\\n- Troubleshooting common issues\\n- Rollback procedures\\n- Safety checklists\\n- Required permissions and access\\n- Environment-specific configurations\\n\\n### Testing Plan\\n- Test production → staging sync\\n- Test production → development sync\\n- Test staging → production sync with approval workflow\\n- Test rollback procedures\\n- Test URL replacement accuracy\\n- Test serialized data integrity\\n- Verify wp-content/uploads handling\\n\\n### Create Documentation Files\\n- \`docs/DATABASE-SYNC.md\` - Main documentation\\n- \`docs/DATABASE-SYNC-TROUBLESHOOTING.md\` - Troubleshooting guide\\n- Update \`README.md\` with database sync information\\n\\n### Key Topics to Document\\n1. **Prerequisites**: WP-CLI, SFTP access, GitHub Secrets, permissions\\n2. **Production → Staging/Dev Process**: Commands, workflow, expected duration\\n3. **Staging → Production Process**: Safety checks, approval, commands, validation\\n4. **Rollback Procedures**: When to rollback, how to rollback, verification\\n5. **Common Issues**: URL replacement, serialized data, permissions, file size limits\\n6. **Environment Configuration**: Database credentials, URL mappings, file paths\\n7. **Backup Management**: Retention policy, storage location, cleanup\\n8. **Maintenance Mode**: When to enable, how to enable/disable\\n\\n### Testing Scenarios\\n1. **Happy Path Tests**\\n   - Clean production → staging sync\\n   - Clean staging → production sync with approval\\n   - Verify all URLs updated correctly\\n   - Verify WordPress functionality\\n\\n2. **Edge Cases**\\n   - Large database handling\\n   - Serialized data with URLs\\n   - Custom post types and meta\\n   - Multisite considerations (if applicable)\\n   - Plugin-specific data\\n\\n3. **Failure Scenarios**\\n   - Import failure rollback\\n   - Network interruption handling\\n   - Insufficient permissions\\n   - Disk space issues\\n\\n## Acceptance Criteria\\n- [ ] DATABASE-SYNC.md created with complete instructions\\n- [ ] DATABASE-SYNC-TROUBLESHOOTING.md created\\n- [ ] README.md updated with database sync overview\\n- [ ] All sync workflows tested successfully\\n- [ ] Rollback procedure tested and verified\\n- [ ] URL replacement verified on all environments\\n- [ ] WordPress functionality verified after sync\\n- [ ] Documentation reviewed and approved\\n- [ ] Team trained on sync procedures\\n\\n## Deliverables\\n- Complete documentation in /docs\\n- Test results summary\\n- Known issues and limitations documented\\n- Contact information for support\\n\\n## Notes\\n- Documentation should be clear for both technical and non-technical users\\n- Include screenshots where helpful\\n- Keep security considerations in mind when documenting\\n- Update documentation as workflows evolve"
					teamId: "${team.id}"
					projectId: "${project.id}"
					stateId: "${todoState.id}"
					priority: 3
				}) {
					success
					issue {
						id
						identifier
						title
						url
					}
				}
			}
		`;

		const issue3Response = await fetch(LINEAR_API_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `${LINEAR_API_KEY}`
			},
			body: JSON.stringify({ query: issue3Mutation })
		});

		const issue3Data = await issue3Response.json();

		if (issue3Data.errors) {
			throw new Error(`Linear API error: ${JSON.stringify(issue3Data.errors)}`);
		}

		const issue3 = issue3Data.data.issueCreate.issue;
		console.log(`✓ Created: ${issue3.identifier} - ${issue3.title}`);
		console.log(`  URL: ${issue3.url}\n`);

		console.log('✅ Successfully created all database sync issues!\n');
		console.log('📊 Summary:');
		console.log(`   ${issue1.identifier}: ${issue1.title}`);
		console.log(`   ${issue2.identifier}: ${issue2.title}`);
		console.log(`   ${issue3.identifier}: ${issue3.title}`);

	} catch (error) {
		console.error('❌ Error creating issues:', error.message);
		process.exit(1);
	}
}

createDatabaseSyncIssues();
