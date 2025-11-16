/**
 * WordPress Scripts Webpack Config
 *
 * This config builds all custom blocks:
 * - hero
 * - content-section
 * - button
 * - card-grid
 * - cta-section
 */

const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');

module.exports = {
	...defaultConfig,
	entry: {
		'hero/index': path.resolve(__dirname, 'hero', 'index.js'),
		'content-section/index': path.resolve(__dirname, 'content-section', 'index.js'),
		'button/index': path.resolve(__dirname, 'button', 'index.js'),
		'card-grid/index': path.resolve(__dirname, 'card-grid', 'index.js'),
		'cta-section/index': path.resolve(__dirname, 'cta-section', 'index.js'),
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'build'),
	},
};
