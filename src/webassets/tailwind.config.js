module.exports = {
    purge: {
        content: ["*.html"],
    },
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
        }
    },
    variants: {
        extend: {},
    },
    plugins: [
        require("@tailwindcss/typography"),
    ],
};
