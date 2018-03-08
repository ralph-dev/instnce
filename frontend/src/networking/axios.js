import * as axios from "axios";

let baseURL = process.env.API_ENDPOINT || "http://localhost:8080";

console.log(process.env.API_ENDPOINT, baseURL);

const config = {
    baseURL: baseURL
};

const instance = axios.create(config);

export default instance;