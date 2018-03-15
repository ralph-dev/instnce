const express = require('express');
const router = express.Router();
const axios = require('axios');
const config = require("../config");

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

router.post('/github', async (req, res) => {
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



module.exports = router;
