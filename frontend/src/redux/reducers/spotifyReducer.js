import {FETCH_PRS, FETCH_REPOS, GITHUB_FOCUS, GITHUB_LOADING, REPO_SELECTED} from "../actions/github";
import config from "../../config";
import lscache from "lscache";
import {SPOTIFY_ACCESS_TOKEN} from "../actions/auth";

const default_state = {
    error: false,
    repos: [],
    loading: false,
    repo: null,
    spotifyToken: lscache.get(config.GITHUB_LOCAL_STORE_KEY)
};

export default function (state = default_state, action) {
    switch (action.type) {
        case SPOTIFY_ACCESS_TOKEN:
            return {...state, spotifyToken: action.payload};
        default:
            return state;
    }
}