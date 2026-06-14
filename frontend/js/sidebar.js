/*
==========================================
FORM ELEMENTS
==========================================
*/

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

const searchInput =
    document.getElementById("searchInput");

const toggleButton =
    document.getElementById("toggleSidebarBtn");

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
SIDEBAR TOGGLE
==========================================
*/

if (toggleButton) {

    toggleButton.addEventListener(
        "click",
        () => {

            document
                .querySelector(".sidebar")
                .classList.toggle(
                    "collapsed"
                );

        }
    );

}

/*
==========================================
SEARCH OBJECTS
==========================================
*/

if (searchInput) {

    searchInput.addEventListener(
        "keyup",
        () => {

            const value =
                searchInput.value.toLowerCase();

            const cards =
                document.querySelectorAll(
                    ".object-card"
                );

            cards.forEach(card => {

                if (
                    card.innerText
                        .toLowerCase()
                        .includes(value)
                ) {

                    card.style.display =
                        "block";

                } else {

                    card.style.display =
                        "none";

                }

            });

        }
    );

}
