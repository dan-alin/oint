module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
	plugins: ['svelte3', '@typescript-eslint'],
	ignorePatterns: ['*.cjs'],
	overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
	rules: {
		"no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
		"@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
	},
	settings: {
		'svelte3/typescript': () => require('typescript')
	},
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020
	},
	globals: {
		__DATE__: true,
		__RELOAD_SW__: true
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	}
};
