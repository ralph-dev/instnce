/*global chrome*/

import qs from "query-string";
import axios from "../../networking/axios";
import config from "../../config";
import lscache from "lscache";
import {getRepos} from "./github";

export const GITHUB_ACCESS_TOKEN = 'GITHUB_ACCESS_TOKEN';
export const SPOTIFY_ACCESS_TOKEN = 'SPOTIFY_ACCESS_TOKEN';

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = function(length) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

export function githubLogin() {
    function gotAccessToken(access_token) {
        return({
            type: GITHUB_ACCESS_TOKEN,
            payload: access_token
        });
    }

    return (dispatch) => {
        const oauth2Endpoint = 'https://github.com/login/oauth/authorize';

        const params = {
            'client_id': config.GITHUB_KEY,
            'redirect_uri': chrome.identity.getRedirectURL("oauth2"),
            'scope': ['user', 'public_repo', 'repo']
        };

        let queryString = qs.stringify(params);
        let fullURL = `${oauth2Endpoint}?${queryString}`;

        chrome.identity.launchWebAuthFlow({'url': fullURL, 'interactive': true}, async function (redirectUrl) {
            if (redirectUrl) {
                console.log('launchWebAuthFlow login successful: ', redirectUrl);
                let parsed = qs.parse(qs.extract(redirectUrl));
                const code = parsed.code;
                let doc = await axios.post('/auth/github', {code: code});
                lscache.set(config.GITHUB_LOCAL_STORE_KEY, doc.data.access_token);
                dispatch(gotAccessToken(doc.data.access_token));
                dispatch(getRepos(doc.data.access_token));
            } else {
                console.error("Github Login Failed");
            }
        });
    }
}

function gotSpotifyAccessToken(access_token) {
    return({
        type: SPOTIFY_ACCESS_TOKEN,
        payload: access_token
    });
}

export function spotifyLogin() {
    return (dispatch) => {
        const oauth2Endpoint = 'https://accounts.spotify.com/authorize';
        const state = generateRandomString(16);

        const params = {
            'response_type': 'code',
            'client_id': config.SPOTIFY_KEY,
            'redirect_uri': chrome.identity.getRedirectURL("oauth2"),
            'scope': 'user-read-private user-read-email',
            'state': 'state'
        };

        let queryString = qs.stringify(params);
        let fullURL = `${oauth2Endpoint}?${queryString}`;

        chrome.identity.launchWebAuthFlow({'url': fullURL, 'interactive': true}, async function (redirectUrl) {
            if (redirectUrl) {
                console.log('launchWebAuthFlow login successful: ', redirectUrl);
                let parsed = qs.parse(qs.extract(redirectUrl));
                const code = parsed.code;
                let doc = await axios.post('/auth/spotify', {code: code});
                lscache.set(config.SPOTIFY_ACCESS_LOCAL_STORE_KEY, doc.data.access_token, 59);
                lscache.set(config.SPOTIFY_REFRESH_LOCAL_STORE_KEY, doc.data.refresh_token);
                dispatch(gotSpotifyAccessToken(doc.data.access_token));
                //todo handle spotify login
            } else {
                console.error("Spotify Login Failed");
                // todo handle login faliure
            }
        });
    }
}

export async function spotifyRefresh() {
    return async (dispatch) => {
        const spotifyRefresh = lscache.get(config.SPOTIFY_REFRESH_LOCAL_STORE_KEY);
        if (spotifyRefresh) {
            let doc = await axios.post('/auth/refreshSpotify', {refreshToken: spotifyRefresh});
            lscache.set(config.SPOTIFY_ACCESS_LOCAL_STORE_KEY, doc.data.access_token, 59);
            dispatch(gotSpotifyAccessToken(doc.data.access_token));

        } else {
            // todo handle no token
        }
    }
}

