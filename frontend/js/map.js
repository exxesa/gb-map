const objectList =
    document.getElementById(
        "objectList"
    );

const searchInput =
    document.getElementById(
        "searchInput"
    );

const mapCoordinatesInput =
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

/*
==========================================
CATEGORY ICON
==========================================
*/

function getCategoryEmoji(category) {

    if (!category)
        return "📍";

    return category.split(" ")[0];

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
            .addTo(map);

        marker.bindPopup(`
            <h3>${item.name}</h3>

            <p>
                🌍 ${item.country}
            </p>

            <p>
                🏙 ${item.city}
            </p>

            <p>
                ${item.category}
            </p>

            <p>
                ${item.description}
            </p>
        `);

        const card =
            document.createElement(
                "div"
            );

        card.className =
            "object-card";

        card.innerHTML = `
            <h4>
                ${emoji}
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
                        [
                            parseFloat(lat),
                            parseFloat(lng)
                        ],
                        10
                    );

                    marker.openPopup();

                }
            );

        objectList.appendChild(
            card
        );

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

        if (
            mapCoordinatesInput
        ) {

            mapCoordinatesInput.value =
                selectedCoordinates;

        }

    }
);

/*
==========================================
SEARCH
==========================================
*/

if (searchInput) {

    searchInput.addEventListener(
        "input",
        function() {

            const value =
                this.value
                .toLowerCase();

            const cards =
                document.querySelectorAll(
                    ".object-card"
                );

            cards.forEach(card => {

                const text =
                    card.innerText
                    .toLowerCase();

                card.style.display =
                    text.includes(value)
                    ? "block"
                    : "none";

            });

        }
    );

}

/*
==========================================
START
==========================================
*/

loadBasePoints();
