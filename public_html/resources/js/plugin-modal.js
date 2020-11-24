document.addEventListener("DOMContentLoaded", (event) => {

    const m_gallery = document.querySelectorAll('.magnific-gallery');
    m_gallery.forEach(t => {
        $(t).find('.magnific-image').magnificPopup({
            type: 'image',
            removalDelay: 500,
            image: {
                // options for image content type
                titleSrc: 'title'
            },
            gallery: {
                // options for gallery
                enabled: true,
                tCounter: ''
            },
            callbacks: {
                open: () => {

                },

                beforeOpen: function () {
                    // just a hack that adds mfp-anim class to markup
                    this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                    this.st.mainClass = "mfp-zoom-in";
                }
            }
            // other options
        });
    });

    const m_image = document.querySelectorAll('.magnific-image');
    m_image.forEach(t => {
        $(t).magnificPopup({
            type: 'image',
            removalDelay: 500,
            image: {
                // options for image content type
                titleSrc: 'title'
            },
            gallery: {
                // options for gallery
                enabled: false,
                tCounter: ''
            },
            callbacks: {
                open: () => {

                },

                beforeOpen: function () {
                    // just a hack that adds mfp-anim class to markup
                    this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                    this.st.mainClass = "mfp-zoom-in";
                }
            }
            // other options
        });
    });

// POPUP YOUTUBE
    const m_video = document.querySelectorAll('.magnific-video');
    m_video.forEach(t => {
        $(t).magnificPopup({
            /*disableOn: 700,*/
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 500,
            preloader: false,
            fixedContentPos: false,
            iframe: {
                markup: '<div class="mfp-iframe-scaler">' +
                    '<div class="mfp-close"></div>' +
                    '<iframe class="mfp-iframe" frameborder="0" allowfullscreen  allow="autoplay"></iframe>' +
                    '</div>',
                patterns: {
                    youtube: {
                        src: 'https://www.youtube.com/embed/%id%?autoplay=1&rel=0'
                    },
                    vimeo: {
                        index: 'vimeo.com/',
                        id: '/',
                        src: '//player.vimeo.com/video/%id%?autoplay=1&loop=1&title=0&byline=0&portrait=0&sidedock=0&controls=1'
                    }
                }
            },
            callbacks: {
                beforeOpen: function () {
                    // just a hack that adds mfp-anim class to markup
                    this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                    this.st.mainClass = "mfp-zoom-in";
                }
            },
        });
    });

    // MAGNIFIC HTML POPUP CONTENT
    const m_inline = document.querySelectorAll('.magnific-inline');
    m_inline.forEach(t => {
        $(t).magnificPopup({
            type: 'inline',
            removalDelay: 500,
            closeBtnInside: true,
            callbacks: {
                beforeOpen: function () {
                    // just a hack that adds mfp-anim class to markup
                    this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                    this.st.mainClass = "mfp-zoom-in";
                }
            },
            mainClass: 'mfp-fade',
            midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
        });
    });
});