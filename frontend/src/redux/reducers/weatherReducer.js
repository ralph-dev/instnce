import {FETCH_LOCAL_WEATHER, FETCH_WEATHER, LOCATION_ERROR} from "../actions/weatherActions";
import config from "../../config";
import lscache from 'lscache';

const default_state = {
    error: false,
    weather: null,
};

export default function (state = default_state, action) {
    switch (action.type) {
        case FETCH_LOCAL_WEATHER:
            return {...state, weather: action.payload};
        case FETCH_WEATHER:
            if (!action.error && action.payload.data) {
                lscache.set(config.WEATHER_LOCAL_STORE_KEY, action.payload.data, 5);
            }
            return {...state, weather: action.payload.data, error:action.error};
        case LOCATION_ERROR:
            return {...state, error: action.payload};
        default:
            return state;
    }
}