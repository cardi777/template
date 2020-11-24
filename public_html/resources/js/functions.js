// get the log
if (console.everything === undefined) {
    console.everything = [];
    console.everything_flat = [];

    console.defaultLog = console.log.bind(console);
    console.log = function () {
        console.everything.push({"type": "log", "datetime": Date().toLocaleString(), "value": Array.from(arguments)});
        console.everything_flat.push("Log:   " + Array.from(arguments));
        console.defaultLog.apply(console, arguments);
    }
    console.defaultError = console.error.bind(console);
    console.error = function () {
        console.everything.push({"type": "error", "datetime": Date().toLocaleString(), "value": Array.from(arguments)});
        console.everything_flat.push("Error: " + Array.from(arguments));
        console.defaultError.apply(console, arguments);
    }
    console.defaultWarn = console.warn.bind(console);
    console.warn = function () {
        console.everything.push({"type": "warn", "datetime": Date().toLocaleString(), "value": Array.from(arguments)});
        console.everything_flat.push("Warn:  " + Array.from(arguments));
        console.defaultWarn.apply(console, arguments);
    }
    console.defaultDebug = console.debug.bind(console);
    console.debug = function () {
        console.everything.push({"type": "debug", "datetime": Date().toLocaleString(), "value": Array.from(arguments)});
        console.everything_flat.push("Debug: " + Array.from(arguments));
        console.defaultDebug.apply(console, arguments);
    }
}

hotkeys('shift+d+o+u+g', function (event, handler) {
    send_log();
});

let send_log = () => {
    let currentdate = new Date();
    let datetime = currentdate.getDate() + "/"
        + (currentdate.getMonth() + 1) + "/"
        + currentdate.getFullYear() + " @ "
        + (currentdate.getHours() > 13 ? currentdate.getHours() - 12 : currentdate.getHours()) + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();
    let address = window.location.hostname + window.location.pathname;

    let log = Array();
    log.push("mailto:dev@delivery.net.au?subject=Debugging " + address);
    log.push("&body=" + console.everything_flat.join('%0d%0a'));
    log.push("%0D%0A-------------%0D%0AGenerated: " + datetime);
    log.push("%0D%0A" + $.browser.name + " " + $.browser.version + " " + ($.browser.win == true ? "Win" : "MAC"));
    let link = log.join('');
    window.location = link;
}

let resize = () => {
    if (typeof (Event) === 'function') {
        // modern browsers
        window.dispatchEvent(new Event('resize'));
    } else {
        // for IE and other old browsers
        // causes deprecation warning on modern browsers
        var evt = window.document.createEvent('UIEvents');
        evt.initUIEvent('resize', true, false, window, 0);
        window.dispatchEvent(evt);
    }
}
let resize_full_heights = () => {
    const heights = document.querySelectorAll(".full-height");
    heights.forEach(heights => {
        heights.style.height = window.screen.height + "px";
    });
}
let scroll_to_top = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

let scrolled = () => window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop

let scroll_to_element = (x) => {
    if (x) {
        if (window.location.hash === "#" + x) {
            const scrollto = document.getElementById(x);
            if (typeof (scrollto) != 'undefined' && scrollto != null) {
                console.log('--- scrolling to #' + x)
                scrollto.scrollIntoView(true); // Top
            } else {
                console.log('--- not scrolling to #' + x)
            }
        }
    } else {
        console.log('--- not scrolling to #' + x)
    }
}

let param = (url, name) => (url.split(name + '=')[1] || '').split('&')[0]

let webp_fix = () => {
    console.log("--- running webp fix");
    let src = null;
    let srcset = null;
    let style = null;

    const image = document.querySelectorAll('img[src^="glide/"],img[src^="/glide/"],div[style*="glide/"],div[style*="/glide/"],img[src^="img/"],img[src^="/img/"],div[style*="img/"],div[style*="/img/"]');

    image.forEach(image => {

        src = image.getAttribute("src");
        srcset = image.getAttribute("srcset");
        style = image.getAttribute("style");

        if (style) {
            image.setAttribute("style", style.replace(/&fm=webp/g, "").replace(/\?fm=webp/g, "?"));
        }
        if (srcset) {
            image.setAttribute("srcset", srcset.replace(/&fm=webp/g, "").replace(/\?fm=webp/g, "?"));
        }
        if (src) {
            image.setAttribute("src", src.replace(/&fm=webp/g, "").replace(/\?fm=webp/g, "?"));
        }

        src = image.getAttribute("src");
        srcset = image.getAttribute("srcset");
        style = image.getAttribute("style");

        if (src.indexOf("glide/") >= 0) {

            if (src.indexOf("?") >= 0) {
                if (src.indexOf(".jpg") >= 0) {
                    image.setAttribute("src", src.replace(/\?/g, "?fm=jpg&"));
                }
                if (src.indexOf(".png") >= 0) {
                    image.setAttribute("src", src.replace(/\?/g, "?fm=png&"));
                }
                if (src.indexOf(".jpeg") >= 0) {
                    image.setAttribute("src", src.replace(/\?/g, "?fm=jpeg&"));
                }
            } else {

                if (src.indexOf(".jpg") >= 0) {
                    image.setAttribute("src", src + "?fm=jpg");
                }
                if (src.indexOf(".png") >= 0) {
                    image.setAttribute("src", src + "?fm=png");
                }
                if (src.indexOf(".jpeg") >= 0) {
                    image.setAttribute("src", src + "?fm=jpeg");
                }
            }
        }
    });
}

let retina_fix = () => {
    console.log("--- running retina fix");
    let src = null;
    let srcset = null;
    let style = null;

    const image = document.querySelectorAll('img[src^="glide/"], div[style*="glide/"], img[src^="img/"], div[style*="img/"]');

    image.forEach(image => {

        src = image.getAttribute("src");
        srcset = image.getAttribute("srcset");
        style = image.getAttribute("style");

        if (src.indexOf("w=") >= 0) {
            if (param(src, "w") >= 1200) {
                return true;
            }
        }

        if (src.indexOf("?") >= 0) {

            if (style) {
                image.setAttribute("style", style.replace(/\?/g, "?dpr=2&"));
            }
            if (srcset) {
                image.setAttribute("srcset", srcset.replace(/\?/g, "?dpr=2&"));
            }
            if (src) {
                image.setAttribute("src", src.replace(/\?/g, "?dpr=2&"));
            }
        } else {

            if (style) {
                image.setAttribute("src", src + "?dpr=2");
            }
            if (srcset) {
                image.setAttribute("srcset", src + "?dpr=2");
            }
            if (src) {
                image.setAttribute("src", src + "?dpr=2");
            }
        }

        image.setAttribute('status', 'processed')

    });

}

const hide_email_addresses = () => {
    const email_addresses = document.querySelectorAll("a[email-a]");

    email_addresses.forEach(e => {

        const a = e.getAttribute('email-a');
        const b = e.getAttribute('email-b');

        if (a && b) {
            e.setAttribute('href', "mailto:" + a + "@" + b);
            e.removeAttribute("email-a");
            e.removeAttribute("email-b");
            e.innerHTML = a + "@" + b;

            console.log("--- hidden: " + a + "@" + b)
        } else {
            e.remove();
        }

    });

}
let hasClass = (element, className) => (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;

let fix_sticky = () => {
    // FIX sticky header
    const nav = document.querySelector("nav");
    if (hasClass(nav, 'fixed')) {
        console.log("--- nav is fixed, patching");
        const wrapper = document.querySelector("nav-spacer");
        wrapper.style.height = nav.offsetHeight + "px";
    }
}

const startup = () => {

    hide_email_addresses();

    // CHECK IF SCROLLED AT ALL
    window.onscroll = () => {
        if (scrolled() > 0) {
            document.body.classList.add("scrolled");
        } else {
            document.body.classList.remove("scrolled");
        }
    };

    if (window.devicePixelRatio > 1) {
        retina_fix();
        document.body.classList.add('retina');
    }

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        // IS A DEVICE
        document.body.classList.add('mobile');
    }

    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        // IS apple device
        document.body.classList.add('apple');
    }
}

let makeid = () => {
    var i;
    var text = "";
    //var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (i = 0; i < 20; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

let setCookie = (name, value, days) => {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

let getCookie = (name) => {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

let eraseCookie = (name) => document.cookie = name + '=; Max-Age=-99999999;'

let reset_form = (form) => {
    console.log('--- resetting...');
    let form_button = document.querySelector("#" + form.getAttribute("id") + " input[type=submit]")
    form_button.setAttribute('value', form_button.getAttribute('data'));
    form.reset();
}

let setup_forms = () => {
    const submit_buttons = document.querySelectorAll("input[type=submit]");
    submit_buttons.forEach(button => {
        button.setAttribute('data', button.getAttribute('value'));
    })

    const form_lettersonly = document.querySelectorAll("input.lettersonly");
    form_lettersonly.forEach(input => {
        input.setAttribute('pattern', '[a-zA-Z]+')
    })

    const form_numbersonly = document.querySelectorAll("input.numbersonly");
    form_numbersonly.forEach(input => {
        input.setAttribute('pattern', '[0-9]+')
    })

    const form_phone = document.querySelectorAll("input.phone");
    form_phone.forEach(input => {
        input.setAttribute('pattern', '^[0-9-]*$')
    })

}