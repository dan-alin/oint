/** @type {import('tailwindcss').Config} */

const withOpacity = (variableName) => {
	return ({ opacityValue }) => {
		if (opacityValue !== undefined) {
			return `rgba(var(${variableName}), ${opacityValue})`;
		}
		return `rgb(var(${variableName}))`;
	};
};

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
				primary: withOpacity('--color-primary'),
				secondary: withOpacity('--color-secondary'),
				accent: withOpacity('--color-accent'),
				success: withOpacity('--color-success'),
				warning: withOpacity('--color-warning'),
				error: withOpacity('--color-error'),
				disabled: withOpacity('--color-disabled'),
				'light-gray': withOpacity('--color-light-gray'),
				background: withOpacity('--color-background')
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
					primary: 'rgb(46, 70, 255)',
					secondary: 'rgb(255, 85, 128)',
					accent: 'rgb(255, 220, 0)',
					success: 'rgb(77, 224, 136)',
					warning: 'rgb(255, 220, 0)',
					error: 'rgb(255, 85, 85)'
				},
				dark: {
					...require('daisyui/src/colors/themes')['[data-theme=dark]'],
					primary: 'rgb(255, 85, 128)',
					secondary: 'rgb(46, 70, 255)',
					accent: 'rgb(255, 220, 0)',
					success: 'rgb(77, 224, 136)',
					warning: 'rgb(255, 220, 0)',
					error: 'rgb(255, 85, 85)'
				}
			}
		]
	},
	plugins: [require('daisyui')]
};
