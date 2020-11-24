Modernizr.on('webp', function (result) {

    if (result && !/iPhone|iPad|iPod/i.test(navigator.userAgent)) {

        // Has WebP support
    } else {
        console.log('--- webp not supported');
        webp_fix();
    }
});
