const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res) => {

    try {

        const result = await db.query(
            "SELECT * FROM markets ORDER BY id"
        );

        res.json(result.rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Server error"
        });

    }

});

router.post("/", async (req, res) => {

    try {

        const {
            name,
            country,
            city,
            category,
            latitude,
            longitude,
            description
        } = req.body;

        const result = await db.query(
            `
            INSERT INTO markets
            (
                name,
                country,
                city,
                category,
                latitude,
                longitude,
                description
            )
            VALUES
            (
                $1,$2,$3,$4,$5,$6,$7
            )
            RETURNING *
            `,
            [
                name,
                country,
                city,
                category,
                latitude,
                longitude,
                description
            ]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Server error"
        });

    }

});

router.delete("/:id", async (req, res) => {

    try {

        await db.query(
            "DELETE FROM markets WHERE id=$1",
            [req.params.id]
        );

        res.json({
            success: true
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Server error"
        });

    }

});

module.exports = router;
