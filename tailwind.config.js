/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FFFBF2',
        sky: '#4FC3F7',
        skydark: '#1FA6E0',
        sun: '#FFC93C',
        grass: '#5FCB6C',
        coral: '#FF7E79',
        grape: '#B18CFF',
        bubblegum: '#FF8FD8',
        ink: '#3A3358',
      },
      fontFamily: {
        display: ['"Baloo 2"', 'cursive'],
        body: ['"Nunito"', 'sans-serif'],
      },
      borderRadius: {
        blob: '2rem',
      },
      boxShadow: {
        soft: '0 10px 30px -10px rgba(58, 51, 88, 0.25)',
        pop: '0 6px 0 0 rgba(0,0,0,0.15)',
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(4deg)' },
        },
        drift: {
          '0%': { transform: 'translateX(-10%)' },
          '100%': { transform: 'translateX(110%)' },
        },
      },
      animation: {
        floaty: 'floaty 4s ease-in-out infinite',
        wiggle: 'wiggle 2s ease-in-out infinite',
        drift: 'drift 25s linear infinite',
      },
    },
  },
  plugins: [],
}
