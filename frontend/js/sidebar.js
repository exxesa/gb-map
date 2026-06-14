/*
==========================================
ELEMENTS
==========================================
*/

const saveButton =
    document.getElementById(
        "saveButton"
    );

const toggleLeftPanel =
    document.getElementById(
        "toggleLeftPanel"
    );

const toggleRightPanel =
    document.getElementById(
        "toggleRightPanel"
    );

const leftPanel =
    document.getElementById(
        "leftPanel"
    );

const rightPanel =
    document.getElementById(
        "rightPanel"
    );

const nameInput =
    document.getElementById(
        "name"
    );

const countryInput =
    document.getElementById(
        "country"
    );

const cityInput =
    document.getElementById(
        "city"
    );

const categoryInput =
    document.getElementById(
        "category"
    );

const coordinatesInput =
    document.getElementById(
        "coordinates"
    );

const descriptionInput =
    document.getElementById(
        "description"
    );

/*
==========================================
SAVE OBJECT
==========================================
*/

async function saveBaseObject() {

    if (
        !coordinatesInput ||
        !coordinatesInput.value
    ) {

        alert(
            "Click on map first"
        );

        return;
    }

    const baseData = {

        name:
            nameInput.value,

        country:
            countryInput.value,

        city:
            cityInput.value,

        category:
            categoryInput.value,

        coordinates:
            coordinatesInput.value,

        description:
            descriptionInput.value

    };

    try {

        const result =
            await addBaseData(
                baseData
            );

        console.log(result);

        alert(
            "Object saved successfully"
        );

        location.reload();

    } catch (error) {

        console.error(error);

        alert(
            "Error while saving object"
        );

    }

}

/*
==========================================
SAVE BUTTON
==========================================
*/

if (saveButton) {

    saveButton.addEventListener(
        "click",
        saveBaseObject
    );

}

/*
==========================================
LEFT PANEL BUTTON
==========================================
*/

if (
    toggleLeftPanel &&
    leftPanel
) {

    toggleLeftPanel.addEventListener(
        "click",
        function () {

            leftPanel.classList.toggle(
                "hidden"
            );

        }
    );

}

/*
==========================================
RIGHT PANEL BUTTON
==========================================
*/

if (
    toggleRightPanel &&
    rightPanel
) {

    toggleRightPanel.addEventListener(
        "click",
        function () {

            rightPanel.classList.toggle(
                "hidden"
            );

        }
    );

}
