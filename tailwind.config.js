/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'sf-display': [
          'SF Pro Display',
          'SF Pro Icons',
          'Helvetica Neue',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
        'sf-text': [
          'SF Pro Text',
          'SF Pro Icons',
          'Helvetica Neue',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
      colors: {
        apple: {
          blue: '#0071e3',
          'blue-dark': '#2997ff',
          'blue-link': '#0066cc',
          black: '#000000',
          'near-black': '#1d1d1f',
          'light-gray': '#f5f5f7',
          'dark-surface': '#1c1c1e',
          'dark-surface-2': '#2c2c2e',
          'dark-surface-3': '#3a3a3c',
        },
      },
      letterSpacing: {
        'apple-display': '-0.028em',
        'apple-section': '0',
        'apple-body': '-0.022em',
        'apple-caption': '-0.016em',
      },
      lineHeight: {
        'apple-display': '1.07',
        'apple-section': '1.10',
        'apple-tile': '1.14',
        'apple-body': '1.47',
      },
      borderRadius: {
        'apple-card': '18px',
        'apple-btn': '8px',
        'apple-pill': '980px',
      },
      boxShadow: {
        'apple-card': 'rgba(0, 0, 0, 0.22) 3px 5px 30px 0px',
        'apple-card-sm': 'rgba(0, 0, 0, 0.12) 2px 4px 20px 0px',
      },
    },
  },
  plugins: [],
};
