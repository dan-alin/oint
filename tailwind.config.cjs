/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	safelist: [{ pattern: /w-1\/\d*/ }],
	theme: {
		extend: {
			brightness: {
				40: '.40',
				175: '1.75'
			},
			colors: {
				primary: 'var(--color-primary)',
				secondary: 'var(--color-secondary)',
				accent: 'var(--color-accent)',
				success: 'var(--color-success)',
				warning: 'var(--color-warning)',
				error: 'var(--color-error)',
				disabled: 'var(--color-disabled)',
				'light-gray': 'var(--color-light-gray)'
			},
			fontFamily: {
				raleway: ['Raleway', 'sans-serif']
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
				},
				dark: {
					...require('daisyui/src/colors/themes')['[data-theme=dark]'],
					primary: '#FF5580',
					secondary: '#2E46FF',
					accent: '#FFDC00',
					success: '#4DE088',
					warning: '#FFDC00',
					error: '#FF5555'
				}
			}
		]
	},
	plugins: [require('daisyui')]
};
