const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const DATA_PATH = path.join(__dirname, "data", "resources.json");

app.get("/", (req, res) => {
    res.json({ ok: true, message: "API is running" });
});

app.get("/api/resources", (req, res) => {
    const data = JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
    res.json(data);
});

app.post("/api/resources", (req, res) => {
    const data = JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));

    const newResource = {
        id: Date.now(),
        ...req.body
    };

    data.resources.push(newResource);
    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));

    res.status(201).json({ ok: true, resource: newResource });
});

const PORT = 5050;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
