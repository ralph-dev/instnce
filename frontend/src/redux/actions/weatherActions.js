import axios from "../../networking/axios";
import lscache from 'lscache';
import config from "../../config";

export const FETCH_WEATHER = "FETCH_WEATHER";
export const FETCH_LOCAL_WEATHER = "FETCH_LOCAL_WEATHER";
export const LOCATION_ERROR = "LOCATION_ERROR";

function couldNotGetLocation(err) {
    return {
        type: LOCATION_ERROR,
        payload: err
    }
}

function gotStoredWeather(weather) {
    return {
        type: FETCH_LOCAL_WEATHER,
        payload: weather
    }
}

export function getLocationAndWeather(forceUpdate) {
    return (dispatch) => {
        let weather = lscache.get(config.WEATHER_LOCAL_STORE_KEY);
        let position = lscache.get(config.LOCATION_LOCAL_STORE_KEY);
        if (weather && forceUpdate !== true) {
            console.log("Getting Local Weather");
            dispatch(gotStoredWeather(weather));
        } else if (position && forceUpdate !== true) {
            console.log("Getting Local Location");
            dispatch(getWeather(position.lat, position.long));
        } else {
            if (navigator.geolocation) {
                console.log("Getting new Location");
                navigator.geolocation.getCurrentPosition((position => {
                        lscache.set(config.LOCATION_LOCAL_STORE_KEY, {lat: position.coords.latitude, long: position.coords.longitude});
                        dispatch(getWeather(position.coords.latitude, position.coords.longitude))
                    }),
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
