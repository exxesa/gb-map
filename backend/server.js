require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const baseRoutes = require("./routes/base");

const app = express();

app.use(cors());
app.use(express.json());

app.use(
    express.static(
        path.join(__dirname, "../frontend")
    )
);

app.use("/api/base", baseRoutes);

app.get("/", (req, res) => {

    res.sendFile(
        path.join(
            __dirname,
            "../frontend/index.html"
        )
    );

});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
