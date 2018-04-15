const express = require('express');
const router = express.Router();
const axios = require('axios');
const config = require("../config");
const querystring = require("querystring");


router.post('/github', async (req, res) => {
    const githubAuth = axios.create({
        baseURL: 'https://github.com/login/oauth/access_token',
        headers: {
            Accept: 'application/json'
        },
        params: {
            client_id: config.GITHUB_KEY,
            client_secret: config.GITHUB_SECRET
        }
    });


    const { code } = req.body || {code: null};
    if (code) {
        try {
            let doc = await  githubAuth({
                method: 'POST',
                params: {
                    code: code
                }
            });
            console.log(doc.data);
            res.send(doc.data);
        } catch (err) {
            console.log(err);
            res.status(500).send("Could not get token");
        }
    } else {
        res.status(422).send("Requires a code");
    }
});

const spotifyAuth = axios.create({
    baseURL: 'https://accounts.spotify.com/api/token',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + new Buffer(config.SPOTIFY_KEY + ':' + config.SPOTIFY_SECRET).toString('base64')
    }
});

router.post('/spotify', async(req, res) => {
    const {code} = req.body || {code: null};
    if (code) {
        try {
            let doc = await spotifyAuth({
                method: 'POST',
                params: {
                    client_id: config.SPOTIFY_KEY,
                    client_secret: config.SPOTIFY_SECRET,
                    redirect_uri: "https://fhklfbgpmalnjmihaghigbpgopkmdhfi.chromiumapp.org/oauth2",
                    grant_type: "authorization_code",
                    code: code
                }
            });
            console.log(doc.data);
            res.send(doc.data);
        } catch(err) {
            console.log(err);
            res.status(500).send("Could Not Get token")
        }
    } else {
        res.status(422).send("Requires a code");
    }
});

router.post('/firefox/spotify', async(req, res) => {
    const {code} = req.body || {code: null};
    if (code) {
        try {
            let doc = await spotifyAuth({
                method: 'POST',
                params: {
                    client_id: config.SPOTIFY_KEY,
                    client_secret: config.SPOTIFY_SECRET,
                    redirect_uri: "https://e5977564079910dfa336f77947738e3a3e31295d.extensions.allizom.org/oauth2",
                    grant_type: "authorization_code",
                    code: code
                }
            });
            console.log(doc.data);
            res.send(doc.data);
        } catch(err) {
            console.log(err);
            res.status(500).send("Could Not Get token")
        }
    } else {
        res.status(422).send("Requires a code");
    }
});

router.post('/refreshSpotify', async(req, res) => {
    const {refreshToken} = req.body || {refreshToken: null};
    if (refreshToken) {
        try {
            let doc = await spotifyAuth({
                method: 'POST',
                params: {
                    grant_type: 'refresh_token',
                    refresh_token: refreshToken
                }
            });
            console.log(doc.data);
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
