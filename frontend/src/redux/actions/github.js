import axios from "../../networking/axios";

export const FETCH_REPOS = 'GET_REPOS';

export function githubLogin() {
    let baseURL = process.env.API_ENDPOINT || "http://localhost:8080";
    window.location.replace(`${baseURL}/auth/github`);
}

export function getRepos(authKey) {
    let promise = axios('/github/user/repos', {
        headers: {'Authorization': authKey}
    });

    return {
        type: FETCH_REPOS,
        payload: promise
    }
}