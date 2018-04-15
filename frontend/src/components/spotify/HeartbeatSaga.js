import {HEARTBEAT_ACTION_TYPE} from 'redux-heartbeat'
import { takeEvery,  put } from 'redux-saga/effects';
import {currentlyPlaying} from "../../redux/actions/spotify";
import {AUTH_TOKEN_REFRESH, CURTENTLY_PLAYING} from "./Heartbeat";
import {spotifyRefresh} from "../../redux/actions/auth";

export function* onHeartbeat(action) {
    console.log(action.meta.name);
    if (action.meta.name === CURTENTLY_PLAYING) {
        yield put(currentlyPlaying())
    } else if (action.meta.name === AUTH_TOKEN_REFRESH) {
        console.log(AUTH_TOKEN_REFRESH);
        yield put(spotifyRefresh())
    }
}

export function* heartbeatSaga() {
    yield takeEvery(HEARTBEAT_ACTION_TYPE, onHeartbeat);
}