/*global chrome*/

import axios from "../../networking/axios";
import qs from 'query-string';
import config from "../../config";

export const REPO_SELECTED = "REPO_SELECTED";
export const FETCH_REPOS = 'FETCH_REPOS';
export const FETCH_PRS = 'FETCH_PRS';
export const GITHUB_LOADING = 'GITHUB_LOADING';
export const GITHUB_FOCUS = 'GITHUB_FOCUS';

function githubLoading() {
    return {
        type: GITHUB_LOADING
    }
}

function githubFocus(inFocus) {
    return {
        type: GITHUB_FOCUS,
        inFocus: inFocus
    }
}

export function githubLogin() {
    const oauth2Endpoint = 'https://github.com/login/oauth/authorize';

    const params = {'client_id': config.GITHUB_KEY,
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
            localStorage.setItem('githubToken', doc.data.access_token);
        } else {
            console.error("Github Login Failed");
        }
    });

}

export function getRepos(authKey) {
    return (dispatch) => {
        dispatch(githubLoading());

        let promise = axios('/github/user/repos', {
            headers: {'Authorization': authKey},
            method: 'GET'
        });

        dispatch( {
            type: FETCH_REPOS,
            payload: promise
        })
    };
}

function _repoSelected(repo) {
    return{
        type: REPO_SELECTED,
        payload: repo
    }

}

export function repoSelected(authKey, repo) {
    console.log("Auth", authKey);
    return (dispatch) => {
        dispatch(githubFocus(true));
        dispatch(_repoSelected(repo));
        let url = repo.pulls_url.match(/\/repos.+?(?=pulls)/i)[0];

        let promise = axios('github' + url,  {
            headers: {'Authorization': authKey},
            method: 'GET'
        });

        dispatch({
            type: FETCH_PRS,
            payload: promise
        })
    }
}

export function clearRepo() {
    return (dispatch) => {
        dispatch(githubFocus(false));
        dispatch(_repoSelected(null));
    }
}