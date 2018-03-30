import axios from "../../networking/axios";
import config from "../../config";
import lscache from 'lscache';

export const JIRA_LOGIN = "JIRA_LOGIN";
export const JIRA_LOGIN_FAILURE = "JIRA_LOGIN_FAILURE";

export function jiraLogin({url, username, password}) {
    console.log(url);
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
            console.log(res);
        } catch (err) {
            console.log(err);
            dispatch({
                type: JIRA_LOGIN_FAILURE
            })
        }
    };
}