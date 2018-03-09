export function githubLogin() {
    let baseURL = process.env.API_ENDPOINT || "http://localhost:8080";
    window.location.replace(`${baseURL}/auth/github`);
}

export function parseGithubLogin(params) {
    let {code} = params;
    if (code) {
        // axios
    }
}