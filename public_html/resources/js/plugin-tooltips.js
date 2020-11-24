document.addEventListener("DOMContentLoaded", function (event) {
    tippy.setDefaultProps({
        content: (reference) => reference.getAttribute('data-content'),
        arrow: true,
        allowHTML: true,
        moveTransition: 'transform 0.2s ease-out',
        hideOnClick: true,
        interactive: true,
        interactiveBorder: 10,
        animateFill: false,
        maxWidth: 350,
        placement: 'auto',
        sticky: true,
        trigger: 'manual',
        delay: 50,
        delay: [1000, 200],
        onShow(instance) {
            setTimeout(() => {
                instance.hide()
            }, 5000);
        },
    });
});