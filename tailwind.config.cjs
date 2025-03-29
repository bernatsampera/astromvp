import typographyPlugin from '@tailwindcss/typography';
import daisyui from 'daisyui';

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,json,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        black: '#111111',
        'off-white': '#f7f7f7',
        'light-gray': '#e9e9e9',
        'medium-gray': '#d4d4d4',
        'dark-gray': '#767676',
      },
      spacing: {
        '18': '4.5rem',
        '34': '8.5rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [typographyPlugin, daisyui],
  darkMode: 'class',
  daisyui: {
    themes: [
      {
        ustinov: {
          "primary": "#111111",
          "secondary": "#303030",
          "accent": "#4a7dfc",
          "neutral": "#f7f7f7",
          "base-100": "#ffffff",
          "base-200": "#f7f7f7",
          "base-300": "#e9e9e9",
          "info": "#3abff8",
          "success": "#36d399",
          "warning": "#fbbd23",
          "error": "#f87272",
          "--rounded-box": "0.5rem",
          "--rounded-btn": "0.25rem",
          "--btn-text-case": "none",
          "--animation-btn": "0.15s",
          "--animation-input": "0.15s",
          "--padding-card": "2rem",
        }
      },
    ],
    darkTheme: "ustinov",
  },
};
