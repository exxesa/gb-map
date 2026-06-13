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
WORLD MAP INITIALIZATION
==========================================
*/

const map = L.map("map").setView([20, 0], 2);

/*
==========================================
MAP LAYER
==========================================
*/

L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        maxZoom: 19,
        attribution: "&copy; OpenStreetMap"
    }
).addTo(map);

/*
==========================================
LOAD ALL POINTS FROM DATABASE
==========================================
*/

async function loadBasePoints() {

    const data =
        await getBaseData();

    objectList.innerHTML = "";

    data.forEach(item => {

        if (!item.coordinates)
            return;

        const [lat, lng] =
            item.coordinates.split(",");

        const marker =
            L.marker([
                parseFloat(lat),
                parseFloat(lng)
            ])
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
                📂 ${item.category}
                </p>

                <p>
                ${item.description}
                </p>
            `);

        objectList.innerHTML += `
            <div class="object-card">

                <b>${item.name}</b>

                <p>
                ${item.country}
                </p>

                <button
                    onclick="
                    map.flyTo(
                    [${lat},${lng}],
                    10
                    );
                    marker.openPopup();
                    ">

                    Go To

                </button>

            </div>
        `;

    });

}

/*
==========================================
MAP CLICK EVENT
==========================================
*/

let selectedCoordinates = null;

map.on("click", function(event) {

    const lat =
        event.latlng.lat.toFixed(6);

    const lng =
        event.latlng.lng.toFixed(6);

    selectedCoordinates =
        `${lat},${lng}`;

    coordinatesText.innerHTML = `
        Lat: ${lat}<br>
        Lng: ${lng}
    `;

});

/*
==========================================
LOAD DATA AFTER MAP START
==========================================
*/

loadBasePoints();
