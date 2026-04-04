/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#EBF3FC',
          100: '#C4DCFA',
          200: '#85B7EB',
          300: '#2B7CD3',
          400: '#2B7CD3',
          500: '#185FA5',
          600: '#0C447C',
          900: '#061E36',
        },
        ink:     '#0D1B2A',
        surface: '#F5F7FA',
      },
      fontFamily: {
        sans:    ['Outfit', 'system-ui', 'sans-serif'],
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      fontSize: {
        'xs':   ['11px', { lineHeight: '1.4' }],
        'sm':   ['13px', { lineHeight: '1.5' }],
        'base': ['16px', { lineHeight: '1.7' }],
        'lg':   ['18px', { lineHeight: '1.6' }],
        'xl':   ['21px', { lineHeight: '1.5' }],
        '2xl':  ['26px', { lineHeight: '1.3' }],
        '3xl':  ['34px', { lineHeight: '1.2' }],
        '4xl':  ['44px', { lineHeight: '1.1' }],
        '5xl':  ['58px', { lineHeight: '1.05' }],
        '6xl':  ['74px', { lineHeight: '1.0' }],
      },
      borderRadius: {
        'pill': '100px',
        '2xl':  '16px',
        '3xl':  '24px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
      },
    },
  },
  plugins: [],
}
