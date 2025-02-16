/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'neuroxion-black': '#0A0A0A',
        'neuroxion-red': '#FF3B30',
        'neuroxion-blue': '#29B6F6',
      },
    },
  },
  plugins: [],
}