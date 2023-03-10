import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';

const config: UserConfig = {
	logLevel: 'info',
	build: {
		minify: false
	},
	define: {
		__DATE__: `'${new Date().toISOString()}'`,
		__RELOAD_SW__: false,
		'process.env': process.env
	},
	// WARN: this will not be necessary on your project
	server: {
		fs: {
			// Allow serving files from hoisted root node_modules
			allow: ['../..']
		}
	},
	plugins: [
		sveltekit(),
		SvelteKitPWA({
			srcDir: './src',
			mode: 'development',
			strategies: 'injectManifest',
			filename: 'prompt-sw.ts',
			scope: '/',
			base: '/',

			devOptions: {
				enabled: true,
				type: 'module',
				navigateFallback: '/'
			},
			// if you have shared info in svelte config file put in a separate module and use it also here
			kit: {}
		})
	]
};

export default config;
