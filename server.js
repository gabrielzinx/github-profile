const http = require("http");
const path = require("path");
const fs = require("fs");
const port = 5000;
require("dotenv").config()

const server = http.createServer((req, res) => {
    res.end("Hello, World!");
});

server.listen(port, console.log(`Server is running: http://localhost:${port}`));