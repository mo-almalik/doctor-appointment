/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
     colors : {
      mainlight : '#5D5FEF88',
      primary:'#312ECB',
      secondary:'#2E4049',
      light:'#E8E8E8',
      NavLink:'#787878',
      cardOne:'#FFE2E5',
      cardTow:'#FFF4DE',
      'main': {  DEFAULT: '#4162EF',  50: '#B8DAFF',  100: '#A3CFFF',  200: '#7ABAFF',  300: '#52A5FF',  400: '#298FFF',  500: '#007AFF',  600: '#005FC7',  700: '#00448F',  800: '#002957',  900: '#000F1F',  950: '#000103'},
     },
     screens :{
            // max  up   and min dow
      'em' :{'min' : '320px' , 'max': '481px'},
      
      'sm': {'min': '640px', 'max': '767px'},
    // => @media (min-width: 640px and max-width: 767px) { ... }

    'md': {'min': '768px', 'max': '1023px'},
    // => @media (min-width: 768px and max-width: 1023px) { ... }

    'lg': {'min': '1024px', 'max': '1279px'},
    // => @media (min-width: 1024px and max-width: 1279px) { ... }

    'xl': {'min': '1280px', 'max': '1535px'},
    // => @media (min-width: 1280px and max-width: 1535px) { ... }

    '2xl': {'min': '1536px'},
    // => @media (min-width: 1536px) { ... }
    }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

