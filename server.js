const express = require("express");
const app = express();
const cors = require('cors');
const morgan = require("morgan");
const path = require("path");

const axios = require('axios');

const weatherApi = axios.create({
    baseURL: "https://api.darksky.net/forecast/",
    params: {
        lang: "en",
        units: "ca",
        exclude: ["hourly", "minutely"]
    }
});

// serve build statically because for simple testing
// app.use(express.static(path.join(__dirname, "/build")));
app.use(morgan('tiny'));
app.use(cors());


app.get('/getWeather', async (req, res) => {
    let lat = req.query.lat;
    let long = req.query.long;
    let url = `/352a2b441280de2d20e504c4692119fb/${lat},${long}`;
    if (lat === undefined || long === undefined) {
        res.status(400).send("Requires latitude and longitude");
    } else {
        try {
            let doc = await weatherApi(url);
            res.send(doc.data);
        } catch (err) {
            console.log(err);
            res.status(500).send("Could not get data");
        }
    }
});


app.listen(8080, () => console.log("Listening on port 8000"));