
import axios from "../../networking/axios";

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