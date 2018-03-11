import {FETCH_REPOS, GITHUB_LOADING} from "../actions/github";

const default_state = {
    error: false,
    repos: null,
    loading:false
};

export default function (state = default_state, action) {
    switch (action.type) {
        case GITHUB_LOADING:
            return {...state, loading: true};
        case FETCH_REPOS:
            return {...state, repos: action.payload.data, error: (action.payload.status !== 200), loading: false};
        default:
            return state;
    }
}