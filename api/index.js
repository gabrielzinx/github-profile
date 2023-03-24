const express = require("express");
const port = 3000;
require("dotenv").config();

const api = express();

async function getProfile(username) {
    const user = await fetch(`https://api.github.com/users/${username}`, { headers: { Authorization: process.env.YOUR_ACCESS_TOKEN_GITHUB } })
    return user;
}

api.get("/", async (req, res) => {    
    
    const { username } = req.query;

    if (!username) return res.status(400).json({ error: 'Missing username' });

    const profile = await getProfile(username).then(data => data.json());

    console.log(`Request user of [${profile.login}]`);
    
    if (!profile.login) return res.status(404).json({ error: 'User not found' });

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(profile);

});

api.listen(port, console.log(`API is running: http://localhost:${port}`));