import {combineReducers} from "redux";
import weatherReducer from "./weatherReducer";

const indexReducer = combineReducers({
    weather:weatherReducer
});

export default indexReducer;