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

async function saveBaseObject() {

    if (
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

        await addBaseData(
            baseData
        );

        alert(
            "Object saved"
        );

        location.reload();

    } catch (error) {

        console.error(error);

        alert(
            "Save error"
        );
    }
}

if (saveButton) {

    saveButton.addEventListener(
        "click",
        saveBaseObject
    );
}

if (
    toggleLeftPanel &&
    leftPanel
) {

    toggleLeftPanel.addEventListener(
        "click",
        () => {

            leftPanel.classList.toggle(
                "hidden"
            );
        }
    );
}

if (
    toggleRightPanel &&
    rightPanel
) {

    toggleRightPanel.addEventListener(
        "click",
        () => {

            rightPanel.classList.toggle(
                "hidden"
            );
        }
    );
}
