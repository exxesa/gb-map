/*
==========================================
MAP ELEMENTS
==========================================
*/

const coordinatesText =
    document.getElementById(
        "coordinatesText"
    );

const objectList =
    document.getElementById(
        "objectList"
    );

/*
==========================================
WORLD MAP
==========================================
*/

const map = L.map("map").setView(
    [20, 0],
    2
);

/*
==========================================
MAP LAYER
==========================================
*/

L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        maxZoom: 19,
        attribution:
            "&copy; OpenStreetMap"
    }
).addTo(map);

/*
==========================================
SELECTED COORDINATES
==========================================
*/

let selectedCoordinates = null;

/*
==========================================
MAP CLICK
==========================================
*/

map.on("click", function(event) {

    const lat =
        event.latlng.lat.toFixed(6);

    const lng =
        event.latlng.lng.toFixed(6);

    selectedCoordinates =
        `${lat},${lng}`;

    if (coordinatesText) {

        coordinatesText.innerHTML = `
            Latitude: ${lat}
            <br>
            Longitude: ${lng}
        `;

    }

});

/*
==========================================
LOAD ALL OBJECTS
==========================================
*/

async function loadBasePoints() {

    const data =
        await getBaseData();

    if (objectList) {

        objectList.innerHTML = "";

    }

    data.forEach(item => {

        if (!item.coordinates)
            return;

        const coordinates =
            item.coordinates.split(",");

        const lat =
            parseFloat(
                coordinates[0]
            );

        const lng =
            parseFloat(
                coordinates[1]
            );

        const marker =
            L.marker([
                lat,
                lng
            ]).addTo(map);

        marker.bindPopup(`
            <h3>${item.name}</h3>

            <p>
                <b>Country:</b>
                ${item.country}
            </p>

            <p>
                <b>City:</b>
                ${item.city}
            </p>

            <p>
                <b>Category:</b>
                ${item.category}
            </p>

            <p>
                ${item.description}
            </p>
        `);

        if (objectList) {

            const card =
                document.createElement(
                    "div"
                );

            card.className =
                "object-card";

            card.innerHTML = `
                <h4>
                    ${item.name}
                </h4>

                <p>
                    ${item.country}
                </p>

                <button>
                    Go To
                </button>
            `;

            card
                .querySelector("button")
                .addEventListener(
                    "click",
                    () => {

                        map.flyTo(
                            [lat, lng],
                            8
                        );

                        marker.openPopup();

                    }
                );

            objectList.appendChild(
                card
            );

        }

    });

}

/*
==========================================
START
==========================================
*/

loadBasePoints();
