import * as axios from "axios";

const config = {
    baseURL: "http://localhost:8000"
};

const instance = axios.create(config);

export default instance;