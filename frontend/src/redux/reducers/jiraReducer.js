import config from "../../config";
import lscache from "lscache";
import {FETCH_ISSUES, JIRA_LOGIN, JIRA_LOGIN_FAILURE} from "../actions/jira";

export const LOGIN_ERROR = "LOGIN_ERROR";
export const FETCH_ISSUES_ERROR = "FETCH_ISSUES_ERROR";

const default_state = {
    error: false,
    issues: null,
    auth: lscache.get(config.JIRA_AUTH_LOCAL_STORE_KEY)
};

export default function (state = default_state, action) {
    switch (action.type) {
        case JIRA_LOGIN:
            return {...state, auth: action.payload};
        case JIRA_LOGIN_FAILURE:
            return {...state, auth: null, error: LOGIN_ERROR};
        case FETCH_ISSUES:
            if (action.error) {
                return {...state, error: FETCH_ISSUES_ERROR}
            }
            return {...state, issues: action.payload.data.issues};
        default:
            return state;
    }
}