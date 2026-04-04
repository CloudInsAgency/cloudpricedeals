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
          50:  '#D6E8F7',
          100: '#B3D2F0',
          300: '#4A90D9',
          400: '#2474C0',
          500: '#185FA5',
          600: '#0C447C',
          900: '#061E36',
        },
        cream:  '#F5F0E8',
        cream2: '#EDE8DF',
        ink:    '#1A1A1A',
      },
      fontFamily: {
        sans:    ['Jost', 'system-ui', 'sans-serif'],
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      fontSize: {
        'xs':   ['14px', { lineHeight: '1.5' }],
        'sm':   ['16px', { lineHeight: '1.6' }],
        'base': ['18px', { lineHeight: '1.75' }],
        'lg':   ['21px', { lineHeight: '1.6' }],
        'xl':   ['24px', { lineHeight: '1.5' }],
        '2xl':  ['30px', { lineHeight: '1.3' }],
        '3xl':  ['40px', { lineHeight: '1.15' }],
        '4xl':  ['52px', { lineHeight: '1.05' }],
        '5xl':  ['68px', { lineHeight: '1.0' }],
        '6xl':  ['86px', { lineHeight: '0.95' }],
      },
    },
  },
  plugins: [],
}
