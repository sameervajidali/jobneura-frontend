export default {
  
  plugins: [
    require('@tailwindcss/postcss')(), // 👈 MUST use this, not 'tailwindcss'
    require('autoprefixer'),
  ],
};


