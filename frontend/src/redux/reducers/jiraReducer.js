import config from "../../config";
import lscache from "lscache";
import {JIRA_LOGIN, JIRA_LOGIN_FAILURE} from "../actions/jira";

const default_state = {
    error: false,
    issues: [],
    auth: lscache.get(config.JIRA_AUTH_LOCAL_STORE_KEY)
};

export default function (state = default_state, action) {
    switch (action.type) {
        case JIRA_LOGIN:
            return {...state, auth: action.payload};
        case JIRA_LOGIN_FAILURE:
            return {...state, auth: null, error: true};
        default:
            return state;
    }
}