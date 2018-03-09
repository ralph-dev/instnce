const axios = require('axios');
const express = require('express');
const config = require('../config');
const passport = require('passport');
const { URL, URLSearchParams } = require('url');
const OAuth2 = require('passport-oauth2');

console.log(config.GITHUB_KEY, config.GITHUB_SECRET, process.env.API_ENDPOINT || `http://localhost:${config.PORT}/`);

const router = express.Router();

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use(new OAuth2(
    {
        authorizationURL: 'https://github.com/login/oauth/authorize',
        tokenURL: 'https://github.com/login/oauth/access_token',
        clientID: config.GITHUB_KEY,
        clientSecret: config.GITHUB_SECRET,
        callbackURL: 'http://localhost:8080/github/auth/callback'
    },
    ((accessToken, refreshToken, profile, cb) => {
        console.log(accessToken);
        cb(null, accessToken);
    })
));


// const github = axios.create({
//     baseURL: 'https://api.github.com',
//     headers: {
//         Accept: 'application/vnd.github.v3+json'
//     }
// });


router.get('/auth', passport.authenticate('oauth2'), (req) => {
    console.log('Started GitHub OAath');
});

router.get('/auth/callback', passport.authenticate('oauth2'), (req, res) => {
    console.log('Received Callback from GitHub OAuth');
    const baseURL = process.env.FRONTEND_URL || 'http://localhost:3000';
    const redirectUrl = new URL('/', baseURL);
    const params = new URLSearchParams(req.query);
    redirectUrl.search = params.toString();
    res.redirect(redirectUrl.toString());
});


module.exports = router;
