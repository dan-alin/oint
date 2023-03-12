/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
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
				// 	dark: {
				// 		...require('daisyui/src/colors/themes')['[data-theme=dark]'],
				// 		primary: '#2E46FF',
				// 		secondary: '#FF5580',
				// 		accent: '#FFDC00',
				// 		success: '#4DE088',
				// 		warning: '#FFDC00',
				// 		error: '#FF5555'
				// 	}
			}
		]
	},
	plugins: [require('daisyui')]
};
