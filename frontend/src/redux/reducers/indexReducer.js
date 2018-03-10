import {combineReducers} from "redux";
import weatherReducer from "./weatherReducer";
import githubReducer from "./githubReducer";

const indexReducer = combineReducers({
    weather:weatherReducer,
    github: githubReducer
});

export default indexReducer;