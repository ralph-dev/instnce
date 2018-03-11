import axios from "../../networking/axios";

export const FETCH_REPOS = 'GET_REPOS';
export const GITHUB_LOADING = 'GITHUB_LOADING';

function githubLoading() {
    return {
        type: GITHUB_LOADING
    }
}

export function githubLogin() {
    let baseURL = process.env.API_ENDPOINT || "http://localhost:8080";
    window.location.replace(`${baseURL}/auth/github`);
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