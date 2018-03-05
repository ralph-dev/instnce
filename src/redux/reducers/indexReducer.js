import {combineReducers} from "redux";
import weatherReducer from "./weatherReducer";

const indexReducer = combineReducers({weatherReducer});

export default indexReducer;