document.addEventListener("DOMContentLoaded", (event) => {

    const map = document.getElementById("map");

    if (typeof (map) != 'undefined' && map != null) {

        // Map
        const m1 = false;
        const m2 = false;
        const m3 = false;

        //const address = "";
        const link = "https://goo.gl/maps/SS1YanCeHqRgwRzA7";
        const lon = "-32.8715497";
        const lat = "151.6350859";
        const zoomer = 13;
        const marker = "resources/images/marker.png";

        if (window.screen.width >= 1087) {
            const m1 = true;
            const m2 = true;
            const m3 = true;
        }

        $(map).gmap3({
            center: [lon, lat],
            zoom: zoomer,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeId: "standard", // to select it directly
            mapTypeControlOptions: {
                mapTypeIds: [google.maps.MapTypeId.ROADMAP, "standard"]
            },
            mapTypeControl: false,
            options: {
                zoomControl: m1,
                scaleControl: m2,
                draggable: m3,
            }
        }).marker([
            {
                position: [lon, lat], icon: new google.maps.MarkerImage(
                    marker,
                    new google.maps.Size(88, 114), /* size is determined at runtime */
                    null, /* origin is 0,0 */
                    null, /* anchor is bottom center of the scaled image */
                    new google.maps.Size(88, 114))

            }
        ]).on('click', function (marker) {
            window.open(link);
        }).styledmaptype(
            "standard",
            [
                {
                    "featureType": "landscape",
                    "stylers": [
                        {
                            "hue": "#FFBB00"
                        },
                        {
                            "saturation": 43.400000000000006
                        },
                        {
                            "lightness": 37.599999999999994
                        },
                        {
                            "gamma": 1
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "stylers": [
                        {
                            "hue": "#FFC200"
                        },
                        {
                            "saturation": -61.8
                        },
                        {
                            "lightness": 45.599999999999994
                        },
                        {
                            "gamma": 1
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "stylers": [
                        {
                            "hue": "#FF0300"
                        },
                        {
                            "saturation": -100
                        },
                        {
                            "lightness": 51.19999999999999
                        },
                        {
                            "gamma": 1
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "stylers": [
                        {
                            "hue": "#FF0300"
                        },
                        {
                            "saturation": -100
                        },
                        {
                            "lightness": 52
                        },
                        {
                            "gamma": 1
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "stylers": [
                        {
                            "hue": "#0078FF"
                        },
                        {
                            "saturation": -13.200000000000003
                        },
                        {
                            "lightness": 2.4000000000000057
                        },
                        {
                            "gamma": 1
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "stylers": [
                        {
                            "hue": "#00FF6A"
                        },
                        {
                            "saturation": -1.0989010989011234
                        },
                        {
                            "lightness": 11.200000000000017
                        },
                        {
                            "gamma": 1
                        }
                    ]
                }
            ],
            {name: "standard"}
        );


    }
});