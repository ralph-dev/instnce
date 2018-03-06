import {WEATHER} from "../actions/weatherActions";

const default_state = {
    error: false,
    weather: null,
};

export default function (state = default_state, action) {
    switch (action.type) {
        case WEATHER:
            console.log(action.payload);
            return {...state, weather: action.payload.data, error: (action.payload.status !== 200)};
        default:
            return state;
    }
}