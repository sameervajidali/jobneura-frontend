module.exports =  {
  
  plugins: [
    require('@tailwindcss/postcss')(), // 👈 MUST use this, not 'tailwindcss'
    require('autoprefixer'),
  ],
};


