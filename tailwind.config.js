/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
      colors: {
        sablue: {
          '100': '#dceaed',
          '200': '#73c9e6'
        },
        sagreyblue: {
          '100': '#d1e3e6',
          '200': '#58a9c7'
        },
        saorange: {
          '100': '#f5c0a0',
          '200': '#ef894f'
        },
        sared: {
          '100': '#e9c3b0',
          '200': '#9e4432'
        },
        sapurple: '#ce5897',
      },
    }
  },
  plugins: [require("tailwindcss-animate")],
}

