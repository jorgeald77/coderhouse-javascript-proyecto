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
                'open-sans': ['Open Sans', 'sans-serif'],
                'koliko-regular': ['Koliko Regular'],
                'koliko-bold': ['Koliko Bold'],
                'koliko-light': ['Koliko Light'],
            }
        },
    },
    variants: {
        extend: {
            display: ['group-focus']
        },
    },
    plugins: [
        require('@tailwindcss/forms')
    ],
}
