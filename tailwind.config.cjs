import defaultTheme from 'tailwindcss/defaultTheme';
import typographyPlugin from '@tailwindcss/typography';
import daisyui from 'daisyui';

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,json,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {},
  },
  plugins: [typographyPlugin, daisyui],
  darkMode: 'class',
  daisyui: {
    themes: ['light', 'dark', 'lofi'],
  },
};
