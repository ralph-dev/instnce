import axios from "../../networking/axios";
import lscache from 'lscache';
import config from "../../config";

export const FETCH_WEATHER = "FETCH_WEATHER";
export const FETCH_LOCAL_WEATHER = "FETCH_LOCAL_WEATHER";
export const LOCATION_ERROR = "LOCATION_ERROR";

function couldNotGetLocation(err) {
    return {
        type: LOCATION_ERROR
    }
}

function gotStoredWeather(weather) {
    return {
        type: FETCH_LOCAL_WEATHER,
        payload: weather
    }
}

export function getLocationAndWeather() {
    return (dispatch) => {
        let weather = lscache.get(config.WEATHER_LOCAL_STORE_KEY);
        if (weather) {
            dispatch(gotStoredWeather(weather));
        } else {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position => dispatch(getWeather(position.coords.latitude, position.coords.longitude))),
                    (err) => dispatch(couldNotGetLocation(err)), {timeout: 5000});
            } else {
                dispatch(couldNotGetLocation(new Error("Location Not Enabled")));
            }
        }
    };
}

export function getWeather(lat, long) {
    console.log(lat, long);
    let promise = axios("/weather", {params: {
            lat: lat,
            long: long
        }});
    return {
        type: FETCH_WEATHER,
        payload: promise
    }

}
