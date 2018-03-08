const express = require('express');

const app = express();
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const axios = require('axios');

const port = process.env.port || 8080;

const weatherApi = axios.create({
    baseURL: 'https://api.darksky.net/forecast/',
    params: {
        lang: 'en',
        units: 'ca',
        exclude: ['hourly', 'minutely']
    }
});

app.use(morgan('tiny'));
app.use(cors());
app.use(express.static(path.join(__dirname, 'frontend', 'build')));

app.get('/getWeather', async (req, res) => {
    const { lat } = req.query;
    const { long } = req.query;
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


app.get('/', (req, res) => {
    res.send('Welcome to Instnce server');
});

app.listen(port, () => console.log(`Listening on port ${port}`));
