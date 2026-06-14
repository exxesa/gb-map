const coordinatesText =
    document.getElementById(
        "coordinatesText"
    );

const objectList =
    document.getElementById(
        "objectList"
    );

const searchInput =
    document.getElementById(
        "searchInput"
    );

const coordinatesInput =
    document.getElementById(
        "coordinates"
    );

/*
==========================================
MAP
==========================================
*/

const map =
    L.map("map")
    .setView([20, 0], 2);

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
GLOBAL VARIABLES
==========================================
*/

let selectedCoordinates = null;

let allObjects = [];

let allMarkers = [];

/*
==========================================
CATEGORY ICONS
==========================================
*/

function getCategoryEmoji(category) {

    switch (category) {

        case "🏢":
            return "🏢";

        case "🏭":
            return "🏭";

        case "⚓":
            return "⚓";

        case "🛢":
            return "🛢";

        case "🛰":
            return "🛰";

        default:
            return "📍";
    }

}

/*
==========================================
LOAD OBJECTS
==========================================
*/

async function loadBasePoints() {

    const data =
        await getBaseData();

    allObjects = data;

    objectList.innerHTML = "";

    allMarkers = [];

    data.forEach(item => {

        if (!item.coordinates)
            return;

        const [lat, lng] =
            item.coordinates.split(",");

        const emoji =
            getCategoryEmoji(
                item.category
            );

        const icon =
            L.divIcon({
                html:
                    `<div style="font-size:28px">${emoji}</div>`,
                className: ""
            });

        const marker =
            L.marker(
                [
                    parseFloat(lat),
                    parseFloat(lng)
                ],
                {
                    icon
                }
            )
            .addTo(map)
            .bindPopup(`
                <h3>${item.name}</h3>

                <p>
                🌍 ${item.country}
                </p>

                <p>
                🏙 ${item.city}
                </p>

                <p>
                ${emoji} ${item.category}
                </p>

                <p>
                ${item.description}
                </p>
            `);

        allMarkers.push({
            marker,
            item
        });

        objectList.innerHTML += `
            <div class="object-card">

                <h4>
                    ${emoji}
                    ${item.name}
                </h4>

                <p>
                    ${item.country}
                </p>

                <button
                    onclick="
                        map.flyTo(
                            [${lat},${lng}],
                            8
                        );
                    ">

                    Go To

                </button>

            </div>
        `;
    });

}

/*
==========================================
MAP CLICK
==========================================
*/

map.on(
    "click",
    function(event) {

        const lat =
            event.latlng.lat.toFixed(6);

        const lng =
            event.latlng.lng.toFixed(6);

        selectedCoordinates =
            `${lat},${lng}`;

        coordinatesText.innerHTML =
            `
            Latitude: ${lat}<br>
            Longitude: ${lng}
            `;

        if (
            coordinatesInput
        ) {

            coordinatesInput.value =
                selectedCoordinates;

        }

    }
);

/*
==========================================
SEARCH
==========================================
*/

searchInput.addEventListener(
    "input",
    function() {

        const value =
            this.value.toLowerCase();

        const filtered =
            allObjects.filter(
                item =>
                    item.name
                    .toLowerCase()
                    .includes(value)
            );

        objectList.innerHTML = "";

        filtered.forEach(item => {

            const emoji =
                getCategoryEmoji(
                    item.category
                );

            objectList.innerHTML += `
                <div class="object-card">

                    <h4>
                        ${emoji}
                        ${item.name}
                    </h4>

                    <p>
                        ${item.country}
                    </p>

                </div>
            `;
        });

    }
);

/*
==========================================
START
==========================================
*/

loadBasePoints();
