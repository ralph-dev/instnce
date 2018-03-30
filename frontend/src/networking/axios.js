import * as axios from "axios";

let baseURL = "http://localhost:8080";

const config = {
    baseURL: baseURL,
    withCredentials: true
};

const instance = axios.create(config);

export default instance;