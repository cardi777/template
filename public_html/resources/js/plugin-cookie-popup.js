document.addEventListener("DOMContentLoaded", function (event) {
    if (!Cookies.get('popup')) {
        Cookies.set('popup', '0', {expires: 1, path: '/'});
    }

    open_popup = () => {
        $.magnificPopup.open({
            items: {
                src: '#register-popup',
            },
            type: 'inline',
            closeBtnInside: true,
            open: () => {
            },
            mainClass: 'mfp-fade',
            midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
        });
    }

    /*var scrolled = false;
    $(window).scroll(() => {
    if (!scrolled) {*/
    setTimeout(
        () => {
            if (Cookies.get('popup') != '1') {
                if (window.location.hash === "#video") {
                } else {
                    //open_popup();
                }
                Cookies.set('popup', '1', {expires: 1, path: '/'});
            }
        },
        5000);
    /* }
    scrolled = true;
    });*/

    console.log('--- Popup value: ' + Cookies.get('popup'))

    if (window.location.hash === "#pop") {
        //open_popup();
    }

});


