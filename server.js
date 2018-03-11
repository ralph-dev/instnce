const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const config = require('./config');
const passport = require('passport');

const app = express();

// middleware
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'bobross', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('tiny'));
app.use(cors({
    origin: function (origin, callback) {
        callback(null, true);
    }, credentials : true,
    optionsSuccessStatus: 200
}));
// app.use(express.static(path.join(__dirname, 'frontend', 'build')));

// routes
const auth = require('./routes/auth');
const weather = require('./routes/weather');
const github = require('./routes/github');

// routes
app.use('/weather', weather);
app.use('/github', github);
app.use('/auth', auth);

app.get('/', (req, res) => {
    res.send('Welcome to Instnce server');
});

app.listen(config.PORT, () => console.log(`Listening on port ${config.PORT}`));
