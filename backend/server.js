require("dotenv").config();

const express = require("express");
const cors = require("cors");

const baseRoutes = require("./routes/base");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/base", baseRoutes);

app.get("/", (req, res) => {
res.json({
message: "GB Map API is running"
});
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
console.log(`Server started on port ${PORT}`);
});
