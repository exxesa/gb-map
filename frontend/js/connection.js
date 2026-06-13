const API_URL = "/api/base";

/*
==========================================
GET ALL DATA FROM DATABASE
==========================================
*/

async function getBaseData() {

    try {

        const response = await fetch(API_URL);

        const data = await response.json();

        return data;

    } catch (error) {

        console.error(error);

        return [];

    }

}

/*
==========================================
ADD NEW RECORD
==========================================
*/

async function addBaseData(baseData) {

    try {

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(baseData)

        });

        return await response.json();

    } catch (error) {

        console.error(error);

    }

}

/*
==========================================
DELETE RECORD
==========================================
*/

async function deleteBaseData(id) {

    try {

        const response = await fetch(
            `${API_URL}/${id}`,
            {
                method: "DELETE"
            }
        );

        return await response.json();

    } catch (error) {

        console.error(error);

    }

}
