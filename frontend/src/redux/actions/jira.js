import axios from "../../networking/axios";
import config from "../../config";
import lscache from 'lscache';

export const JIRA_LOGIN = "JIRA_LOGIN";
export const JIRA_LOGIN_FAILURE = "JIRA_LOGIN_FAILURE";
export const FETCH_ISSUES = "FETCH_ISSUES";

export function jiraLogin({url, username, password}) {
    return async (dispatch) => {
        try {
            let res = await axios('/jira/login', {
                auth: {
                    username: username,
                    password: password
                },
                headers: {
                    baseURL: url
                }
            });
            const auth = {url: url, username: username, password: password};
            lscache.set(config.JIRA_AUTH_LOCAL_STORE_KEY, auth);
            dispatch({
                type: JIRA_LOGIN,
                payload: auth
            });
        } catch (err) {
            dispatch({
                type: JIRA_LOGIN_FAILURE
            })
        }
    };
}

export function getIssues({url, username, password}) {
    const promise =  axios('/jira/issues', {
        auth: {
            username: username,
            password: password
        },
        headers: {
            baseURL: url
        }
    });

    return {
        type: FETCH_ISSUES,
        payload: promise
    }
}