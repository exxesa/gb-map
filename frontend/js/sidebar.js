/*
==========================================
FORM ELEMENTS
==========================================
*/
<button id="toggleSidebarBtn">
    ☰ Hide Panel
</button>

<input
    type="text"
    id="searchInput"
    placeholder="Search object...">

<div id="coordinatesBox">

    <h3>Coordinates</h3>

    <p id="coordinatesText">
        Click on map
    </p>

</div>

<div id="objectList"></div>

const addButton =
    document.getElementById("addButton");

const saveButton =
    document.getElementById("saveButton");

const nameInput =
    document.getElementById("name");

const countryInput =
    document.getElementById("country");

const cityInput =
    document.getElementById("city");

const categoryInput =
    document.getElementById("category");

const descriptionInput =
    document.getElementById("description");

/*
==========================================
ADD NEW OBJECT
==========================================
*/

async function saveBaseObject() {

    if (!selectedCoordinates) {

        alert(
            "Select a point on the map first"
        );

        return;
    }

    const baseData = {

        name: nameInput.value,

        country: countryInput.value,

        city: cityInput.value,

        category: categoryInput.value,

        coordinates: selectedCoordinates,

        description:
            descriptionInput.value

    };

    const result =
        await addBaseData(baseData);

    console.log(result);

    location.reload();

}

/*
==========================================
SAVE BUTTON EVENT
==========================================
*/

if (saveButton) {

    saveButton.addEventListener(
        "click",
        saveBaseObject
    );

}
