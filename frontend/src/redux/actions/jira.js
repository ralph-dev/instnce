import axios from "../../networking/axios";

export const JIRA_LOGIN = "JIRA_LOGIN";

export async function jiraLogin(url, username, password) {
    let res = await axios('/jira/login', {
        auth: {
            username: username,
            password: password
        },
        params: {
            url: url
        }
    });


}