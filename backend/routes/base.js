const express = require("express");
const router = express.Router();

const db = require("../db");

/*
==========================================
CREATE TABLE
==========================================
*/

async function createTable() {

    try {

        await db.query(`
            CREATE TABLE IF NOT EXISTS base (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                country VARCHAR(100),
                city VARCHAR(100),
                category VARCHAR(100),
                coordinates VARCHAR(100),
                description TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        console.log("Table base is ready");

    } catch (error) {

        console.error(error);

    }

}

createTable();

/*
==========================================
GET ALL DATA
/api/base
==========================================
*/

router.get("/", async (req, res) => {

    try {

        const result = await db.query(
            "SELECT * FROM base ORDER BY id DESC"
        );

        res.json(result.rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Database error"
        });

    }

});

/*
==========================================
ADD NEW RECORD
/api/base
==========================================
*/

router.post("/", async (req, res) => {

    try {

        const {
            name,
            country,
            city,
            category,
            coordinates,
            description
        } = req.body;

        const result = await db.query(
            `
            INSERT INTO base
            (
                name,
                country,
                city,
                category,
                coordinates,
                description
            )
            VALUES
            (
                $1,$2,$3,$4,$5,$6
            )
            RETURNING *
            `,
            [
                name,
                country,
                city,
                category,
                coordinates,
                description
            ]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Insert error"
        });

    }

});

/*
==========================================
DELETE RECORD
/api/base/:id
==========================================
*/

router.delete("/:id", async (req, res) => {

    try {

        await db.query(
            "DELETE FROM base WHERE id = $1",
            [req.params.id]
        );

        res.json({
            success: true
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Delete error"
        });

    }

});

module.exports = router;
