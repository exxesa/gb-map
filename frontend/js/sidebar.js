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
        !coordinatesInput.value
    ) {

        alert(
            "Select a point on the map first"
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

        await addBaseData(
            baseData
        );

        location.reload();

    } catch (error) {

        console.error(error);

        alert(
            "Error saving object"
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
LEFT PANEL
==========================================
*/

if (toggleLeftPanel) {

    toggleLeftPanel.addEventListener(
        "click",
        () => {

            leftPanel.classList.toggle(
                "hidden"
            );

        }
    );

}

/*
==========================================
RIGHT PANEL
==========================================
*/

if (toggleRightPanel) {

    toggleRightPanel.addEventListener(
        "click",
        () => {

            rightPanel.classList.toggle(
                "hidden"
            );

        }
    );

}
