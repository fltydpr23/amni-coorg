export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#fcfbf9',
          100: '#f9f6f0',
          200: '#f1ede4',
          300: '#e5decb',
          400: '#d5c7a9',
          500: '#c5ae87',
          600: '#b4956a',
          700: '#967954',
          800: '#7a6247',
          900: '#64513d',
          950: '#362b1f',
        },
        sage: {
          50: '#f4f6f4',
          100: '#e5ebe6',
          200: '#ccd8ce',
          300: '#a7bda9',
          400: '#7d9e80',
          500: '#5c8260',
          600: '#47684b',
          700: '#3a533d',
          800: '#304433',
          900: '#28382b',
          950: '#141e16',
        },
        terracotta: {
          50: '#fcf6f4',
          100: '#f8ebe8',
          200: '#f2d8d2',
          300: '#e8b9b0',
          400: '#da8f81',
          500: '#cd6d5c',
          600: '#ba5242',
          700: '#9c4335',
          800: '#813a2f',
          900: '#6d342b',
          950: '#391712',
        },
        warmBlack: '#1a1816',
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 1s ease-out forwards',
        'fade-in': 'fadeIn 1s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
