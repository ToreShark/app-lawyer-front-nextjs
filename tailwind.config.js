/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    fontSize: {
      "2xsm": "1rem",
      xsm: "1.2rem",
      sm: "1.4rem",
      reg: "1.6rem",
      lg: "1.8rem",
      "2xl": "2.2rem",
      "3xl": "2.5rem",
      "4xl": "3.2rem",
      "5xl": "4rem",
      "6xl": "5rem",
      "7xl": "7rem",
    },
  },
  plugins: [],
}
