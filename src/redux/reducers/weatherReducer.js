import {WEATHER} from "../actions/weatherActions";

const default_state = {
    weather: {},
};

export default function (state = default_state, action) {
    switch (action.type) {
        case WEATHER:
            console.log(action.payload.data);
            return {...state, weather: action.payload.data};
        default:
            return state;
    }
}