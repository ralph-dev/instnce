import {FETCH_WEATHER, LOCATION_ERROR} from "../actions/weatherActions";

const default_state = {
    error: false,
    weather: null,
};

export default function (state = default_state, action) {
    switch (action.type) {
        case FETCH_WEATHER:
            console.log(action.payload);
            return {...state, weather: action.payload.data, error: (action.payload.status !== 200)};
        case LOCATION_ERROR:
            console.log("Could not get Location");
            return {...state, error: true};
        default:
            return state;
    }
}