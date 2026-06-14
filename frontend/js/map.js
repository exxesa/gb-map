const objectList =
    document.getElementById("objectList");

const searchInput =
    document.getElementById("searchInput");

const coordinatesInput =
    document.getElementById("coordinates");

const map =
    L.map("map")
    .setView([20, 0], 2);

L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        maxZoom: 19,
        attribution: "&copy; OpenStreetMap"
    }
).addTo(map);

let selectedCoordinates = null;
let allObjects = [];

function getCategoryEmoji(category) {

    if (!category)
        return "📍";

    return category.split(" ")[0];
}

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
                { icon }
            )
            .addTo(map)
            .bindPopup(`
                <h3>${item.name}</h3>
                <p>🌍 ${item.country}</p>
                <p>🏙 ${item.city}</p>
                <p>${item.category}</p>
                <p>${item.description}</p>
            `);

        objectList.innerHTML += `
            <div class="object-card">
                <h4>${emoji} ${item.name}</h4>

                <p>${item.country}</p>

                <button onclick="
                    map.flyTo(
                        [${lat},${lng}],
                        12
                    );
                    marker.openPopup();
                ">
                    Go To
                </button>
            </div>
        `;
    });
}

map.on("click", function(event) {

    const lat =
        event.latlng.lat.toFixed(6);

    const lng =
        event.latlng.lng.toFixed(6);

    selectedCoordinates =
        `${lat},${lng}`;

    if (coordinatesInput) {

        coordinatesInput.value =
            selectedCoordinates;

    }
});

if (searchInput) {

    searchInput.addEventListener(
        "input",
        function() {

            const value =
                this.value.toLowerCase();

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

loadBasePoints();
