const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const config = require('./config');
const app = express();
const bodyParser = require('body-parser');

// middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(cors({
    origin: function (origin, callback) {
        callback(null, true);
    }, credentials : true
}));


// routes
const auth = require('./routes/auth');
const weather = require('./routes/weather');
const github = require('./routes/github');
const spotify = require('./routes/spotify');
const jira = require('./routes/jira');


// routes
app.use('/weather', weather);
app.use('/github', github);
app.use('/auth', auth);
app.use('/spotify', spotify);
app.use('/jira', jira);

app.get('/', (req, res) => {
    res.send('Welcome to Instnce server');
});

app.listen(config.PORT, () => console.log(`Listening on port ${config.PORT}`));
