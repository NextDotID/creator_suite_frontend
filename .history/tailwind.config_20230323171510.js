<<<<<<< HEAD
/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
=======
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    darkMode: 'class',

    // Uncomment the line below to enable the experimental Just-in-Time ("JIT") mode.
    // https://tailwindcss.com/docs/just-in-time-mode
    // mode: "jit",
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans],
            },
        },
    },
    variants: {},
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/forms'),
        require('@tailwindcss/line-clamp'),
        require('@tailwindcss/aspect-ratio'),
    ],
    purge: {
        // Filenames to scan for classes
        content: [
            './src/**/*.html',
            './src/**/*.js',
            './src/**/*.jsx',
            './src/**/*.ts',
            './src/**/*.tsx',
            './public/index.html',
        ],
        // Options passed to PurgeCSS
        options: {
            // Whitelist specific selectors by name
            // whitelist: [],
        },
    },
}
>>>>>>> 6817dc99c0af8756ad303509b33e566627efa915
