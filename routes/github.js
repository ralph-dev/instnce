const axios = require('axios');
const express = require('express');
const config = require('../config');


const router = express.Router();


const github = axios.create({
    baseURL: 'https://api.github.com',
    headers: {
        Accept: 'application/vnd.github.v3+json'
    },
    params: {
        client_id: config.GITHUB_KEY,
        client_secret: config.GITHUB_SECRET
    }
});


const authMiddleware = (req, res, next) => {
    let authKey = req.get('Authorization');
    if (authKey !== null) {
        req.key = authKey;
        next();
    } else {
        res.status(401).send("Did not provide GitHub Auth Key");
    }
};

router.use(authMiddleware);

router.get('/user/repos', async (req, res) => {
    try {
        let githubRes = await github('/user/repos', {
            headers: {
                Authorization: `token ${req.key}`
            }
        });
        if (githubRes.status !== 200) {
            res.stats(githubRes.status).send();
        } else {
            res.send(githubRes.data);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});


router.get('/repos/:owner/:repo', async (req, res) => {
    let {owner, repo} = req.params;
    if (owner && repo) {
        try {
            let githubRes = await github(`/repos/${owner}/${repo}/pulls`, {
                headers: {
                    Authorization: `token ${req.key}`
                }
            });
            if (githubRes.status !== 200) {
                res.stats(githubRes.status).send();
            } else {
                res.send(githubRes.data);
            }
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }

    } else {
        res.status(404).send("Could not find route make sure you included owner and repo");
    }
});
module.exports = router;