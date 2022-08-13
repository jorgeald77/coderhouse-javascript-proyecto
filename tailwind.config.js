/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./*.html", "./js/*.js"],
    theme: {
        extend: {
            colors: {
                transparent: 'transparent',
                current: 'currentColor',
                'appgray': '#C2D9E8',
                'appblue': '#60B2F0',
                'appgreen': '#027D8D',
                'appred': '#F25D50',
                'apporange': '#FFA652',
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
}
