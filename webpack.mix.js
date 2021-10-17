const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */


// admin part of app - with react
/*
mix.js('resources/js/app.js', 'public/js/admin.js')
    .js('resources/js/admin.js', 'public/js/admin.js')
    .react()
    .sass('resources/sass/app.scss', 'public/css/admin.css')
    .css('resources/css/app.css', 'public/css/admin.css')
    .css('resources/css/admin.css', 'public/css/admin.css')
*/

// general part of app - no react needed

mix.js('resources/js/app.js', 'public/js/app.js')
    .sass('resources/sass/app.scss', 'public/css')
    .postCss('resources/css/app.css', 'public/css/app.css', [
        // require('tailwindcss')
    ]);

/*
// Original 8
mix.js('resources/js/app.js', 'public/js')
    .react()
    .sass('resources/sass/app.scss', 'public/css')
    .css('resources/css/app.css', 'public/css')
*/
/*
original 7
mix.js('resources/js/app.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css');
*/