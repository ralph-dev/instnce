import {FETCH_PRS, FETCH_REPOS, GITHUB_FOCUS, GITHUB_LOADING, REPO_SELECTED} from "../actions/github";
import config from "../../config";
import lscache from "lscache";
import {GITHUB_ACCESS_TOKEN} from "../actions/auth";

const default_state = {
    error: false,
    repos: [],
    loading: false,
    repo: null,
    gitHubToken: lscache.get(config.GITHUB_LOCAL_STORE_KEY)
};

export default function (state = default_state, action) {
    switch (action.type) {
        case GITHUB_FOCUS:
            return {...state, focus: action.inFocus};
        case GITHUB_LOADING:
            return {...state, loading: true};
        case REPO_SELECTED:
            console.log(action.payload);
            return {...state, repo: action.payload};
        case FETCH_PRS:
            return {...state, loading: false,  error: (action.error), repo: (action.payload.data)};
        case FETCH_REPOS:
            return {...state, repos: state.repos.concat(action.payload.data), error: (action.error), loading: false};
        case GITHUB_ACCESS_TOKEN:
            return {...state, gitHubToken: action.payload};
        default:
            return state;
    }
}