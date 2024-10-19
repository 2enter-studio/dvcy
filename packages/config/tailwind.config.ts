import daisyui from 'daisyui';
import typography from '@tailwindcss/typography';

const THEMES = { light: ['retro'], dark: ['synthwave', 'gruvbox'] } as const;
type ThemeName = 'retro' | 'synthwave' | 'gruvbox';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts,md}', '../../packages/ui/components/html,js,svelte,ts,md}', './mdsvex.config.ts'],
	theme: {
		extend: {}
	},
	plugins: [daisyui, typography],
	daisyui: {
		themes: [
			{
				light: {
					primary: '#d16012',
					secondary: '#2e4a69',
					accent: '#f38019',
					neutral: '#928374',
					'base-100': '#eddea2',
					info: '#83c07c',
					success: '#b88b26',
					warning: '#fabd2f',
					error: '#fb4934'
				}
			}
		]
	},
	darkMode: 'class'
};

export { THEMES };
export type { ThemeName };

// Primary: --blue (#83a598)
// Secondary: --purple (#d3869b)
// Accent: --orange (#fe8019)
// Neutral: --gray (#928374)
// Base-100: --bg (#282828)
// Info: --aqua (#8ec07c)
// Success: --green (#b8bb26)
// Warning: --yellow (#fabd2f)
// Error: --red (#fb4934)
