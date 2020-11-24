const mix = require('laravel-mix');

mix.styles([
    'node_modules/magnific-popup/dist/magnific-popup.css',
    'node_modules/tippy.js/dist/tippy.css',
    'node_modules/tippy.js/dist/svg-arrow.css',
    'node_modules/tippy.js/animations/scale.css',
    'node_modules/float-labels.js/dist/float-labels.css',
    'node_modules/swiper/swiper-bundle.min.css',
    'node_modules/tailwindcss/dist/base.min.css',
    'public_html/resources/css/tailwind/components.min.css',
    'public_html/resources/css/tailwind/utilities.min.css',
    /*'public_html/resources/css/standards.css',*/
    'public_html/resources/css/standards-tailwind.css',
    'public_html/resources/css/print.css',
], 'public_html/resources/css/mixed.css');

mix.scripts([
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/jquery-match-height/dist/jquery.matchHeight-min.js',
    'node_modules/formbouncerjs/dist/bouncer.min.js',
    'node_modules/formbouncerjs/dist/bouncer.polyfills.min.js',
    'node_modules/magnific-popup/dist/jquery.magnific-popup.js',
    'node_modules/float-labels.js/dist/float-labels.min.js',
    'node_modules/swiper/swiper-bundle.min.js',
    'node_modules/js-cookie/src/js.cookie.js',
    'node_modules/@popperjs/core/dist/umd/popper.min.js',
    'node_modules/tippy.js/dist/tippy-bundle.umd.min.js',
    'node_modules/gmap3/dist/gmap3.js',
    'public_html/resources/js/modernizr-custom.js',
    'public_html/resources/js/functions.js',
    'public_html/resources/js/plugin-cookie-popup.js',
    'public_html/resources/js/plugin-slideshows.js',
    'public_html/resources/js/plugin-tooltips.js',
    'public_html/resources/js/plugin-modal.js',
    'public_html/resources/js/plugin-form.js',
    'public_html/resources/js/plugin-webp.js',
    'public_html/resources/js/plugin-map.js',
    /*'resources/js/standards-v.js',*/
], 'public_html/resources/js/mixed.js');