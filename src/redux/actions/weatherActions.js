import axios from "../../networking/axios";

export const FETCH_WEATHER = "FETCHING_WEATHER";
export const LOCATION_ERROR = "LOCATION_ERROR";

function couldNotGetLocation(err) {
    console.log(err);
    return {
        type: LOCATION_ERROR
    }
}

export function getLocationAndWeather() {
    return (dispatch) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position => dispatch(getWeather(position.coords.latitude, position.coords.longitude))),
                (err) => dispatch(couldNotGetLocation(err)));
        } else {
            alert('It seems like Geolocation, which is required for this page, is not enabled in your browser. Please use a browser which supports it.');
        }
    };
}

export function getWeather(lat, long) {
    console.log(lat, long);
    let promise = axios("/getWeather", {params: {
            lat: lat,
            long: long
        }});
    return {
        type: FETCH_WEATHER,
        payload: promise
    }

}
