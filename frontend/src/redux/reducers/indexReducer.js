import {combineReducers} from "redux";
import weatherReducer from "./weatherReducer";
import githubReducer from "./githubReducer";
import settingsReducer from "./settingsReducer";
import spotifyReducer from "./spotifyReducer";
import jiraReducer from "./jiraReducer";

const indexReducer = combineReducers({
    weather:weatherReducer,
    github: githubReducer,
    settings: settingsReducer,
    spotify: spotifyReducer,
    jira: jiraReducer
});

export default indexReducer;