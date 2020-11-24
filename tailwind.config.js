module.exports = {
    future: {
        removeDeprecatedGapUtilities: true,
        purgeLayersByDefault: true,
    },
    purge: {
        layers: ['utilities'],
        enabled: true,
        target: 'ie11',
        content: [
            'public_html/*.html', 'public_html/*.php', 'public_html/**/*.js'
        ],
    },
    theme: {
        extend: {
            /*colors: {
               deliveryred: '#EF3A42',
               deliveryblue: '#172B54',
               gold: {
                  light: '#ddbf5f',
                  base: '#d4af37',
                  dark: '#aa8c2c'
               },
            }*/
        }
        /*container: {
           center: true,
           padding: '2rem'
        },*/
    },
    /*variants: {},
    plugins: [],*/
}
