/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	safelist: [{ pattern: /w-1\/\d*/ }],
	theme: {
		extend: {
			colors: {
				primary: 'var(--color-primary)',
				secondary: 'var(--color-secondary)',
				accent: 'var(--color-accent)',
				success: 'var(--color-success)',
				warning: 'var(--color-warning)',
				error: 'var(--color-error)'
			}
		}
	},
	daisyui: {
		themes: [
			{
				light: {
					...require('daisyui/src/colors/themes')['[data-theme=light]'],
					primary: '#2E46FF',
					secondary: '#FF5580',
					accent: '#FFDC00',
					success: '#4DE088',
					warning: '#FFDC00',
					error: '#FF5555'
				}
				// dark: {
				// 	...require('daisyui/src/colors/themes')['[data-theme=dark]'],
				// 	primary: '#2E46FF',
				// 	secondary: '#FF5580',
				// 	accent: '#FFDC00',
				// 	success: '#4DE088',
				// 	warning: '#FFDC00',
				// 	error: '#FF5555'
				// }
			}
		]
	},
	plugins: [require('daisyui')]
};
