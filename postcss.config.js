const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = ({ env }) => ({
  plugins: [
    tailwindcss(),
    autoprefixer(),
    env === 'production' ? cssnano({ preset: 'default' }) : false,
  ],
});