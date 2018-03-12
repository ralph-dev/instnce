const axios = require('axios');
const express = require('express');

const router = express.Router();

const weatherApi = axios.create({
    baseURL: 'https://api.darksky.net/forecast/',
    params: {
        lang: 'en',
        units: 'ca',
        exclude: ['hourly', 'minutely']
    }
});

router.get('/', async (req, res) => {
    const { lat, long } = req.query;
    const url = `/352a2b441280de2d20e504c4692119fb/${lat},${long}`;
    if (lat === undefined || long === undefined) {
        res.status(400).send('Requires latitude and longitude');
    }
    else {
        try {
            const doc = await weatherApi(url);
            res.send(doc.data);
        }
        catch (err) {
            console.log(err);
            res.status(500).send('Could not get data');
        }
    }
});



module.exports = router;