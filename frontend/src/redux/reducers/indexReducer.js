import {combineReducers} from "redux";
import weatherReducer from "./weatherReducer";
import githubReducer from "./githubReducer";
import settingsReducer from "./settingsReducer";

const indexReducer = combineReducers({
    weather:weatherReducer,
    github: githubReducer,
    settings: settingsReducer
});

export default indexReducer;