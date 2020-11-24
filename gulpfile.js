const gulp = require('gulp');
const {src, dest, task, watch, series, parallel} = require('gulp');

/*const tailwindcss = require('tailwindcss');*/
const postcss = require('gulp-postcss');
const concat = require('gulp-concat');
const del = require('del');
const minify = require('gulp-minify');
const cleanCss = require('gulp-clean-css');
/*const atimport = require("postcss-import");
const purgecss = require("gulp-purgecss");*/
const cssvars = require('postcss-simple-vars');
const nested = require('postcss-nested');
const cssImport = require('postcss-import');
const postcssPresetEnv = require('postcss-preset-env');
const shortcss = require('postcss-short');
const cssnano = require('cssnano');
const pfm = require('postcss-font-magician');

/*class TailwindExtractor {
   static extract(content) {
      return content.match(/[A-z0-9-:\/]+/g);
   }
}*/

gulp.task('clean', () => {
    return del([
        'public_html/vendor/**/LICENSE',
        'public_html/vendor/**/test',
        'public_html/vendor/**/tests',
        'public_html/vendor/**/doc',
        'public_html/vendor/**/docs',
        'public_html/vendor/**/sample',
        'public_html/vendor/**/samples',
        'public_html/vendor/**/docSource',
        'public_html/vendor/**/example',
        'public_html/vendor/**/examples',
    ]);
});

/*gulp.task('purge-css', () => {
   return src( 'node_modules/tailwindcss/dist/utilities.min.css' )
      /!*.pipe(sass().on('error', sass.logError))*!/
      .pipe(postcss([
         tailwindcss("tailwind.config.js")
      ]))
      .pipe(concat({path: 'tailwind-output.css'}))
      .pipe(dest('public_html/resources/css/tailwind'));
});*/

/*gulp.task('purge-css-3', () => {
   return src('node_modules/tailwindcss/dist/utilities.min.css')
      .pipe(purgecss({
         content: ['public_html/!*.html', 'public_html/!*.php', 'public_html/!**!/!*.js'],
         extractors: [{
            extractor: new TailwindExtractor,
            extensions: ['html','php']
         }]
      }))
      .pipe(dest('public_html/resources/css/tailwind'));
});*/

gulp.task('pack-js', () => {
    return gulp.src([
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/jquery-match-height/dist/jquery.matchHeight-min.js',
        'node_modules/formbouncerjs/dist/bouncer.min.js',
        'node_modules/formbouncerjs/dist/bouncer.polyfills.min.js',
        'node_modules/magnific-popup/dist/jquery.magnific-popup.js',
        'node_modules/swiper/swiper-bundle.min.js',
        'node_modules/js-cookie/src/js.cookie.js',
        'node_modules/@popperjs/core/dist/umd/popper.min.js',
        'node_modules/tippy.js/dist/tippy-bundle.umd.min.js',
        'node_modules/float-labels.js/dist/float-labels.min.js',
        'node_modules/jquery.browser/dist/jquery.browser.min.js',
        'node_modules/hotkeys-js/dist/hotkeys.min.js',
        'node_modules/gmap3/dist/gmap3.js',
        'public_html/resources/js/modernizr-custom.js',
        'public_html/resources/js/functions.js',
        'public_html/resources/js/plugin-cookie-popup.js',
        'public_html/resources/js/plugin-slideshows.js',
        'public_html/resources/js/plugin-tooltips.js',
        'public_html/resources/js/plugin-modal.js',
        'public_html/resources/js/plugin-form.js',
        'public_html/resources/js/plugin-webp.js',
        'public_html/resources/js/plugin-map.js',])
        .pipe(concat('mixed.min.js'))
        .pipe(minify({
            ext: {
                min: '.js'
            },
            noSource: true
        }))
        .pipe(gulp.dest('public_html/resources/js'));
});

gulp.task('pack-css', () => {
    return gulp.src([
        'node_modules/magnific-popup/dist/magnific-popup.css',
        'node_modules/tippy.js/dist/tippy.css',
        'node_modules/tippy.js/dist/svg-arrow.css',
        'node_modules/tippy.js/animations/scale.css',
        'node_modules/swiper/swiper-bundle.min.css',
        'node_modules/float-labels.js/dist/float-labels.css',
        'node_modules/tailwindcss/dist/base.css',
        'node_modules/tailwindcss/dist/components.css',
        /*'public_html/resources/css/tailwind/utilities.css',*/
        /*'public_html/resources/css/standards.css',*/
        'public_html/resources/css/preloader.css',
        'public_html/resources/css/plugins.css',
        'public_html/resources/css/standards.css',
        'public_html/resources/css/print.css'])
        .pipe(concat('mixed.min.css'))
        .pipe(cleanCss())
        .pipe(gulp.dest('public_html/resources/css'));
});

gulp.task('post-css', (done) => {

    return gulp.src(['public_html/resources/css/mixed.min.css', 'public_html/resources/css/print.css', 'public_html/resources/css/standards.css'])
        .pipe(postcss([cssImport, cssvars, nested, postcssPresetEnv, shortcss, cssnano, pfm]))
        .pipe(gulp.dest('public_html/resources/css'))
    done();
})

/*gulp.task('crunch', function () {
   return gulp.src(['src/!**!/!*.js','src/!**!/!*.map'])
      .pipe(concat('tailwind.css'))
      .pipe("npm run crunch");
});*/

/*gulp.task("purge-css-2", () => {

   return gulp
      .src(['node_modules/tailwindcss/dist/utilities.min.css'])
      .pipe(postcss([atimport(), tailwindcss("tailwind.config.js")]))
      .pipe(
         purgecss({
            content: ['public_html/!*.html', 'public_html/!*.php', 'public_html/!**!/!*.js'],
            extractors: [
               {
                  extractor: new TailwindExtractor,
                  extensions: ["html", "php", "js"]
               }
            ]
         })
      )
      .pipe(gulp.dest("public_html/resources/css/tailwind"));
});*/

gulp.task('default', gulp.series('clean', /*'purge-css', */ 'pack-js', 'pack-css', 'post-css'));