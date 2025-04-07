/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        'primary': "#4c96d7"
        // --primary - darker: #1761a0;
        // --primary - lighter: #8dcaff;
      }
    },
  },
  plugins: [],
}