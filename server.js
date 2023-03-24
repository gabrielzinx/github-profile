const express = require("express");
const path = require("path");
const API = require("./api/index.js");
const port = 5000;

const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
    const filePath = path.join(__dirname, "public", "index.html");
    res.sendFile(filePath);
});

app.listen(port, console.log(`SERVER is running: http://localhost:${port}`));