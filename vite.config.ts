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
		__RELOAD_SW__: true,
		'process.env': process.env
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
			manifest: {
				name: 'Oin',
				short_name: 'Oin',
				icons: [
					{ src: 'android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
					{
						src: 'android-chrome-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'maskable'
					}
				],

				theme_color: '#ffffff',
				background_color: '#ffffff',
				display: 'standalone',
				scope: '/',
				start_url: '/'
			},
			injectManifest: {
				globPatterns: ['client/**/*.{js,css,ico,png,svg,webp,woff,woff2}']
			},

			devOptions: {
				enabled: true,
				type: 'module',
				navigateFallback: '/'
			},
			// if you have shared info in svelte config file put in a separate module and use it also here
			kit: {}
		}),
		SvelteKitPWA({
			srcDir: './src',
			mode: 'production',
			strategies: 'injectManifest',
			filename: 'prompt-sw.ts',
			scope: '/',
			base: '/',
			manifest: {
				name: 'Oin',
				short_name: 'Oin',
				icons: [
					{ src: 'android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
					{
						src: 'android-chrome-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'maskable'
					}
				],

				theme_color: '#ffffff',
				background_color: '#ffffff',
				display: 'standalone',
				scope: 'https://oint.vercel.app/',
				start_url: 'https://oint.vercel.app/'
			},
			injectManifest: {
				globPatterns: ['client/**/*.{js,css,html,ico,png,svg,webp,woff,woff2}']
			},

			kit: {}
		})
	]
};

export default config;
