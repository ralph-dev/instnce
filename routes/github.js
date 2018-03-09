const axios = require('axios');
const express = require('express');
const config = require('../config');


const router = express.Router();


const githubAuth = axios.create({
    baseURL: 'https://github.com/login/oauth/',
    headers: {
        Accept: 'application/json'
    },
    params: {
        client_id: config.GITHUB_KEY,
        client_secret: config.GITHUB_SECRET
    }
});


module.exports = router;
