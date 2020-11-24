document.addEventListener("DOMContentLoaded", (event) => {
    console.log('--- doc loaded...');
    startup();
    /*////////////////////////////////////////*/
    /* //////  SLIDESHOW
    /*////////////////////////////////////////*/
    const mySwiper = new Swiper('#slider_1', {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        /*scrollbar: {
            el: '.swiper-scrollbar',
        },*/
    });

    let burger = document.querySelector(".burger a");

    burger.addEventListener('click', function (e) {
        document.body.classList.toggle('nav-open');
    });

});

window.addEventListener("resize", (event) => {

    console.log('--- resizing...');
    fix_sticky();
    resize_full_heights();

});

window.addEventListener("load", (event) => {

    console.log('--- window loaded...');
    resize();
    scroll_to_top();
    setTimeout(() => {
        document.body.style.overflow = "visible";
        const fade_ins = document.querySelectorAll(".fade-in");
        fade_ins.forEach(fade_ins => {
            fade_ins.classList.add("fade-out");
        });
        scroll_to_element("register");
    }, 150);

});