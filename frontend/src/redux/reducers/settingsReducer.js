import config from "../../config";
import lscache from 'lscache';
import {FONT_SIZE_SET} from "../actions/settings";

const default_state = {
    fontSize: lscache.get(config.FONT_SIZE_LOCAL_STORE_KEY) || 1
};

export default function (state = default_state, action) {
    switch (action.type) {
        case FONT_SIZE_SET:
            lscache.set(config.FONT_SIZE_LOCAL_STORE_KEY, action.payload);
            return {...state, fontSize: action.payload};
        default:
            return state;
    }
}