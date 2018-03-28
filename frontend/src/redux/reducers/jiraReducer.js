import {FETCH_PRS, FETCH_REPOS, GITHUB_FOCUS, GITHUB_LOADING, REPO_SELECTED} from "../actions/github";
import config from "../../config";
import lscache from "lscache";
import {JIRA_LOGIN} from "../actions/jira";

const default_state = {
    error: false,
    issues: [],
    loading: false,
    auth: lscache.get(config.JIRA_AUTH)
};

export default function (state = default_state, action) {
    switch (action.type) {
        case JIRA_LOGIN:
            return {...state, auth: action.payload};
        default:
            return state;
    }
}