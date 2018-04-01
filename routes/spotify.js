const axios = require('axios');
const express = require('express');
const config = require('../config');

const router = express.Router();

const spotifyMusic = axios.create({
    baseURL: 'https://api.spotify.com/v1/me',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + new Buffer(config.SPOTIFY_KEY + ':' + config.SPOTIFY_SECRET).toString('base64')
    }
});

router.get('/player/currently-playing', async(req, res) => {
    let {authorization} = req.headers || {authorization: null};
    authorization = 'Bearer ' + authorization;
    if (authorization) {
        try {
            let doc = await spotifyMusic('/player/currently-playing', {
                headers: {'Authorization': authorization},
                method: 'GET'
            });
            console.log("OUTPUT: " + doc.data);
            res.send(doc.data);
        } catch (err) {
            console.log(err);
            res.status(500).send("Could Not Get token")
        }
    } else {
        res.status(422).send("Requires a refreshToken");
    }
});

router.post('/player/next', async(req, res) => {
    let {authorization} = req.headers || {authorization: null};
    authorization = 'Bearer ' + authorization;
    if (authorization) {
        try {
            let doc = await spotifyMusic('/player/next', {
                headers: {'Authorization': authorization},
                method: 'POST'
            });
            console.log("OUTPUT: " + doc.data);
            res.send(doc.data);
        } catch (err) {
            console.log(err);
            res.status(500).send("Could Not Get token")
        }
    } else {
        res.status(422).send("Requires a refreshToken");
    }
});

router.post('/player/previous', async(req, res) => {
    let {authorization} = req.headers || {authorization: null};
    authorization = 'Bearer ' + authorization;
    if (authorization) {
        try {
            let doc = await spotifyMusic('/player/previous', {
                headers: {'Authorization': authorization},
                method: 'POST'
            });
            console.log("OUTPUT: " + doc.data);
            res.send(doc.data);
        } catch (err) {
            console.log(err);
            res.status(500).send("Could Not Get token")
        }
    } else {
        res.status(422).send("Requires a refreshToken");
    }
});

router.put('/tracks', async(req, res) => {
    let {authorization} = req.headers || {authorization: null};
    authorization = 'Bearer ' + authorization;
    const song = req.query.ids;
    console.log("ANSWER: " , song);
    if (authorization) {
        try {
            let doc = await spotifyMusic('/tracks', {
                headers: {'Authorization': authorization, 'Content-Type': 'application/json'},
                params: {'ids': song},
                method: 'PUT'
            });
            console.log("OUTPUT: " + doc.data);
            console.log("ANSWER: " , song);
            res.send(doc.data);
        } catch (err) {
            console.log(err);
            res.status(500).send("Could Not Get token")
        }
    } else {
        res.status(422).send("Requires a refreshToken");
    }
});

router.put('/player/shuffle', async(req, res) => {
    let {authorization} = req.headers || {authorization: null};
    authorization = 'Bearer ' + authorization;
    const shuffleState = req.query.state;
    if (authorization) {
        try {
            let doc = await spotifyMusic('/player/shuffle', {
                headers: {'Authorization': authorization},
                params: {'state': shuffleState},
                method: 'PUT'
            });
            console.log("OUTPUT: " + doc.data);
            res.send(doc.data);
        } catch (err) {
            console.log(err);
            res.status(500).send("Could Not Get token")
        }
    } else {
        res.status(422).send("Requires a refreshToken");
    }
});

module.exports = router;
