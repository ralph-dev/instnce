const passport = require('passport');
const { URL, URLSearchParams } = require('url');
const GithubStrategy = require('passport-github2');
const express = require('express');
const config = require('../config');


const router = express.Router();

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

const callbackURL = new URL("/auth/github/callback", `${process.env.API_ENDPOINT || "http://localhost:8080"}`).toString();

passport.use(new GithubStrategy(
    {
        clientID: config.GITHUB_KEY,
        clientSecret: config.GITHUB_SECRET,
        callbackURL: callbackURL,
        scope: ['user', 'public_repo', 'repo']
    },
    ((accessToken, refreshToken, profile, cb) => {
        if (accessToken) {
            cb(null, accessToken);
        } else {
            cb(error,)
        }
    })
));

router.get('/github', passport.authenticate('github'), () => {
    console.log('Started GitHub OAath');
});

router.get('/github/callback', passport.authenticate('github'), async (req, res) => {
    console.log('Received Callback from GitHub OAuth');
    const baseURL = process.env.FRONTEND_URL || 'http://localhost:3000';
    const redirectUrl = new URL(baseURL);
    res.cookie('githubToken', req.user);
    res.redirect(baseURL);

});

module.exports = router;
