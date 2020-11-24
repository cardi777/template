jQuery(document).ready(function ($) {

    // SLIDER STANDARD
    /*$('slideshow.standard').slick({
        dots: true,
        autoplay: true,
        autoplaySpeed: 3000,
        fade: true,
        speed: 1000,
        arrows: false
    });*/

    // SLIDER HOME
    /*$('slideshow.home').slick({
        lazyLoad: 'ondemand',
        dots: true,
        infinite: true,
        speed: 1000,
        fade: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000
    });*/

    /*document.addEventListener('DOMContentLoaded', function () {

        // Get all "navbar-burger" elements
        var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

        // Check if there are any nav burgers
        if ($navbarBurgers.length > 0) {

            // Add a click event on each of them
            $navbarBurgers.forEach(function ($el) {
                $el.addEventListener('click', function () {

                    // Get the target from the "data-target" attribute
                    var target = $el.dataset.target;
                    var $target = document.getElementById(target);

                    // Toggle the class on both the "navbar-burger" and the "navbar-menu"
                    $el.classList.toggle('is-active');
                    $target.classList.toggle('is-active');

                });
            });
        }

    });*/

    // EQUAL UL
    /*if ($('ul.column-list-js').length > 0) {
        $('ul.column-list-js').columnlist({
            size: 3,
            'class': 'column-list',
            incrementClass: 'column-list-'
        });
    }*/

    // MATCH HEIGHT
    //$('.something').matchHeight();

    // SCROLL REVEAL
    /*if (!mobile) {
        window.sr = ScrollReveal();
        sr.reveal('#main-area  .container:not(#top) .columns', {
            distance: '20px',
            scale: 1,
        });
    }*/

    // SCROLLER
    var nav_height = $('header').outerHeight();
    //console.log('nav height: '+ nav_height);

    $('a[href^="#"]:not(.no-scroll):not(.navbar-clicker)').on('click', function (e) {
        e.preventDefault();
        var e = $(this).attr('href');
        if (e != "#privacy" && e != '#disclaimer' && e != '#') {

            $('html, body').animate({
                scrollTop: $(e).offset().top - nav_height
            }, 1000);

            if (mobile) {
                $('.navbar-burger').removeClass('is-active');
                $('body').removeClass('nav-open');
                $('.navbar-menu').slideUp();
            }

            //var scrollTop = $(e).position().top;
            //$('html, body').animate({scrollTop: scrollTop},'slow');
        }
    });


});

$(window).on('resize', function () {
    $("#intro").height(($(window).height()));
});

$(window).on('load', function () { // makes sure the whole site is loaded

    $(window).trigger('resize');

    $("html, body").animate({scrollTop: 0}, 0);
    $('body').delay(0).css({'overflow': 'visible'});

    $('#preloader')
        .delay(150)
        .fadeOut(350)
        .queue(function () {
            $(window).trigger('resize');

            if (window.location.hash === "#register") {
                $('html, body').animate({
                    scrollTop: $("#register").offset().top
                }, 500);
            }
        });

});