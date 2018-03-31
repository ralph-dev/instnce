const axios = require('axios');
const express = require('express');
const auth = require('basic-auth');

const router = express.Router();


const jiraMiddleware = (req, res, next) => {
    let user = auth(req);
    let baseURL = req.get('baseURL');
    if (!user) {
        res.status(401).send("Did not provide Basic Auth for Jira");

    } else if (!baseURL) {
        res.status(404).send("Could not find endpoint baseURL");
    } else {
        req.api = axios.create({
            baseURL: `${baseURL}/rest/api/2/`,
            auth : {
                username: user.name,
                password: user.pass
            }
        });
        next();
    }
};


router.use(jiraMiddleware);


router.get('/login', async(req, res) => {
   const {api} = req;
    try {
        // ping the server, if user's credentials are invalid it will return a 401
        let jiraRes = await api({
            method: 'GET',
            url:'/serverInfo',
        });
        res.end();
    } catch (err) {
        console.log(err);
        res.status(err.response.status || 500).send();
    }
});

/**
 * Gets all open issues for the user
 */
router.get('/issues', async (req, res) => {
    const {api} = req;
    try {
        let jiraRes = await api({
            method: 'GET',
            url:'/search',
            params: {
                jql: 'Resolution=Unresolved AND assignee=currentuser()',
                fields: 'summary'
            }
        });
        res.send(jiraRes.data);
    } catch (err) {
        console.log(err);
        res.status(err.response.status || 500).send();
    }


});



module.exports = router;