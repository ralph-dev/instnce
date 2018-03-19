import {combineReducers} from "redux";
import weatherReducer from "./weatherReducer";
import githubReducer from "./githubReducer";
import settingsReducer from "./settingsReducer";
import spotifyReducer from "./spotifyReducer";

const indexReducer = combineReducers({
    weather:weatherReducer,
    github: githubReducer,
    settings: settingsReducer,
    spotify: spotifyReducer
});

export default indexReducer;