/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        marquee: 'marquee 25s linear infinite',
        rainbow: "rainbow var(--speed, 2s) infinite linear",
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        rainbow: {
          "0%": { "background-position": "0%" },
          "100%": { "background-position": "200%" },
        },
      },
      fontFamily: {
        'futuristic': ['Space Grotesk', 'sans-serif'],
        'sans': ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
