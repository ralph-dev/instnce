/*global chrome*/

import qs from "query-string";
import axios from "./axios";
import config from "../config";
import lscache from "lscache";

export function githubLogin() {
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
        } else {
            console.error("Github Login Failed");
        }
    });
}