/* eslint-disable global-require */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/**/*.html',
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('@headlessui/tailwindcss'),
  ],
  theme: {
    extend: {
      colors: {
        'primary-40': 'var(--primary-40)',
        'primary-60': 'var(--primary-60)',
        'primary-100': 'var(--primary-100)',
        'primary-120': 'var(--primary-120)',
        'primary-140': 'var(--primary-140)',
        'primary-160': 'var(--primary-160)',
        'primary-180': 'var(--primary-180)',
        'primary-200': 'var(--primary-200)',
      },
    },
  },
};
