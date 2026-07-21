/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#111512",
        paper: "#FDFCF7",
        border: "rgba(17, 21, 18, 0.15)",
        accent: {
          olive: "#8D9973",
          butter: "#ECD399",
          avocado: "#687E5A",
          coconut: "#BACBC5",
          natural: "#EBC16E",
          sesame: "#C49F7D",
          groundnut: "#D7A684",
          ghee: "#E3B44B",
          baking: "#DCA59B",
          ricebran: "#A7C5C8"
        }
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Outfit", "sans-serif"]
      },
      animation: {
        'marquee': 'marquee 55s linear infinite',
        'marquee-reverse': 'marquee-reverse 70s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' }
        }
      }
    },
  },
  plugins: [],
}
