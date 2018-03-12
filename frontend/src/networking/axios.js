import * as axios from "axios";

let baseURL = process.env.API_ENDPOINT || "http://localhost:8080";

const config = {
    baseURL: baseURL,
    withCredentials: true
};

const instance = axios.create(config);

export default instance;