module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
        spacing: {
            card: "30rem",
            75: "19rem",
            85: "22rem",
        },
        height: {
            "70vh": "70vh",
            "90vh": "90vh",
        },
        colors: {
            "orange": "#FB9101",
            "linkedinBlue":"#0072b1"
        },
        fontFamily:{
            'Raleway':["sans-serif"]
        }
    },
},
  plugins: [
    require('@tailwindcss/forms'),
  ],
}