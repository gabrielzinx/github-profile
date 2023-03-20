const http = require("http");
const URL = require("url");
const port = 3000;
require("dotenv").config();

async function getProfile(username) {
    const user = await fetch(`https://api.github.com/users/${username}`, { headers: { Authorization: process.env.YOUR_ACCESS_TOKEN_GITHUB } })
    return user;
}

const server = http.createServer(async (req, res) => {
    
    const { username } = URL.parse(req.url, true).query;
    
    res.writeHead(200, {
        'Access-Control-Allow-Origin': '*'
    });

    if (!username) return "Error - Not Username";

    const profile = await getProfile(username).then(data => data.json());

    console.log(`Request user of [${profile.login}]`);
    res.end(JSON.stringify(profile));
    
    if (!profile.login) return "User Not Found";

    return profile;

});

server.listen(port, console.log(`API is running: http://localhost:${port}`));