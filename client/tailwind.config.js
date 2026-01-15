/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'kakao-yellow': '#FEE500',
        'kakao-yellow-dark': '#E5D400',
        'kakao-blue': '#B2C7D9',
        'kakao-text': '#3C1E1E',
        'kanana-pink': '#FF6B9D',
        'kanana-purple': '#C239B3',
        'profile-blue': '#667eea',
        'profile-purple': '#764ba2',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Malgun Gothic"', '"맑은 고딕"', 'sans-serif']
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        },
        confettiFall: {
          '0%': {
            transform: 'translateY(0) rotateZ(0deg)',
            opacity: '1'
          },
          '100%': {
            transform: 'translateY(100vh) rotateZ(360deg)',
            opacity: '0'
          }
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in',
        'confetti-fall': 'confettiFall 0.6s ease-out forwards'
      }
    },
  },
  plugins: [],
}
