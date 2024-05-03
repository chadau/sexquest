const { transform } = require('typescript');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
		keyframes: {
			blink: {
				'0%, 100%': { opacity: '0' },
				'50%': { opacity: '0' }
			}
		},
		animation: {
			blink: 'blink 1.5s infinite'
		}
	},
  },
  plugins: [],
}

