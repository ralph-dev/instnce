const axios = require('axios');
const express = require('express');
const config = require('../config');

const router = express.Router();

const spotifyMusic = axios.create({
    baseURL: 'https://api.spotify.com/v1/me/player',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + new Buffer(config.SPOTIFY_KEY + ':' + config.SPOTIFY_SECRET).toString('base64')
    }
});

router.get('/currently-playing', async(req, res) => {
    const {authorization} = req.headers || {authorization: null};
    if (authorization) {
        try {
            let doc = await spotifyMusic('/currently-playing', {
                headers: {'Authorization': authorization},
                method: 'GET',
            });
            console.log("OUTPUT: " + doc.data);
            res.send(doc.data);
        } catch(err) {
            console.log(err);
            res.status(500).send("Could Not Get token")
        }
    } else {
        res.status(422).send("Requires a refreshToken");
    }
});

module.exports = router;
