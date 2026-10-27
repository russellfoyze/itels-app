/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ielts: {
          navy: '#002B49',
          blue: '#005ea5',
          red: '#d5281b',
          yellow: '#fff200',
          dark: '#1e2429',
          light: '#f3f4f6',
          border: '#d1d5db',
        }
      }
    },
  },
  plugins: [],
};
