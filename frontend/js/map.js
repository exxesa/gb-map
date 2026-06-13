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

    const data = await getBaseData();

    data.forEach(item => {

        if (!item.coordinates) return;

        const [lat, lng] =
            item.coordinates.split(",");

        L.marker([
            parseFloat(lat),
            parseFloat(lng)
        ])
        .addTo(map)
        .bindPopup(`
            <h3>${item.name}</h3>

            <p><b>Country:</b> ${item.country}</p>

            <p><b>City:</b> ${item.city}</p>

            <p><b>Category:</b> ${item.category}</p>

            <p>${item.description}</p>
        `);

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
