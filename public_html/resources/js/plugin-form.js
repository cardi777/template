document.addEventListener("DOMContentLoaded", (event) => {

    setup_forms();

    const forms = document.querySelectorAll(".validate");
    forms.forEach(form => {

        const form_id = form.getAttribute('id');

        console.log("--- Init form #" + form_id)

        // You may pass in a CSS selector, an HTMLElement or a DomList
        const floatlabels = new FloatLabels('#' + form_id, {
            customEvent: null,
            customLabel: null,
            customPlaceholder: null,
            exclude: '.no-label',
            inputRegex: /email|number|password|search|tel|text|url/,
            prefix: 'fl-',
            prioritize: 'label',
            requiredClass: 'required',
            style: 0,
            transform: 'input, select, textarea',
        });

        let bouncer = new Bouncer("#" + form_id, {
            messageAfterField: false,
            disableSubmit: true
        });

        let sec_gen = makeid();
        setCookie('sec_gen_cookie', sec_gen, 1);

        let btn = document.createElement("input");
        btn.name = "sec_gen";
        btn.id = makeid();
        btn.type = "hidden";
        btn.value = sec_gen;
        form.appendChild(btn);

        document.addEventListener('bouncerFormValid', (event) => {

            let form = event.target;

            /* form data */
            let data = new FormData(form);
            data.append("sec_gen_key", sec_gen);

            /* button changes */
            let form_button = document.querySelector("#" + form.getAttribute("id") + " input[type=submit]")
            form_button.setAttribute('value', 'Sending...');

            // SETUP tooltips
            let tip_success = tippy(document.querySelector("#" + form.getAttribute("id") + " .tooltip-success"));
            let tip_failure = tippy(document.querySelector("#" + form.getAttribute("id") + " .tooltip-failure"));

            const DONE = 4; // readyState 4 means the request is done.
            const OK = 200; // status 200 is a successful return.

            var xhttp = new XMLHttpRequest();

            // The successfully validated form
            xhttp.open("POST", "emailer/send.php", true);
            xhttp.send(data);
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState === DONE) {
                    if (xhttp.status === OK) {
                        let returned = xhttp.responseText;
                        console.log("--- post result: " + returned); // 'This is the returned text.'

                        if (returned) {

                            switch (returned) {
                                case "":

                                    break;
                                default:
                                    if (returned == 1) {
                                        reset_form(form);
                                        tip_success.show();

                                    } else {
                                        tip_failure.show();
                                    }
                            }

                        } else {

                            tip_failure.show();

                        }

                    } else {
                        console.log('--- Ajax error: ' + xhttp.status); // An error occurred during the request.
                    }
                }
            };

        });

    });

});