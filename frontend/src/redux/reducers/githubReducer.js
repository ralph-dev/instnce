import {FETCH_REPOS} from "../actions/github";

const default_state = {
    error: false,
    repos: null,
};

export default function (state = default_state, action) {
    switch (action.type) {
        case FETCH_REPOS:
            return {...state, repos: action.payload.data, error: (action.payload.status !== 200)};
        default:
            return state;
    }
}