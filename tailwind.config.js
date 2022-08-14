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
            fontFamily: {
                'koliko-regular': ['Koliko Regular'],
                'koliko-bold': ['Koliko Bold'],
                'koliko-light': ['Koliko Light'],
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms')
    ],
}
