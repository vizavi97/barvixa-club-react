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

// mix.js('resources/js/app.js', 'public/js')
//     .react()
//     .sass('resources/sass/app.scss', 'public/css');

// var LiveReloadPlugin = require('webpack-livereload-plugin');
// mix.webpackConfig({
//     plugins: [new LiveReloadPlugin()]
// });

// var tsLoader = require('ts-load');
// mix.webpackConfig({
//     plugins: [new LiveReloadPlugin()]
// });

mix.ts('resources/js/index.tsx', 'public/js')
    .react()
    // .postCss('resources/css/app.css', 'public/css', [
    //     //
    // ]);
