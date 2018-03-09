export function githubLogin() {
    let baseURL = process.env.API_ENDPOINT || "http://localhost:8080";
    window.location.replace(`${baseURL}/github/auth`)
}