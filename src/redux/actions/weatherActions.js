import axios from "../../networking/axios";

export const WEATHER = "FETCHING_WEATHER";

export function getWeather() {
    // todo get location
    let promise = axios("/getWeather", {params: {
            lat: 0,
            long: 0
        }});
    return {
        type: WEATHER,
        payload: promise
    }
}