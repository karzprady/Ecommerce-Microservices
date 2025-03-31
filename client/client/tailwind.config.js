// Example tailwind.config.js
module.exports = {
	content: [
	  './src/**/*.{html,js,jsx,ts,tsx}', // Adjust according to your project structure
	],
	theme: {
	  extend: {
		// You can extend the theme here
		borderRadius: {
		  'md': '0.375rem', // Make sure 'md' is not overwritten
		},
	  },
	},
	plugins: [],
  }
  