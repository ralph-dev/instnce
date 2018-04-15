import {createHeartbeat} from "redux-heartbeat";

export const CURTENTLY_PLAYING = "CURRENTLY_PLAYING";
export const AUTH_TOKEN_REFRESH = "AUTH_TOKEN_REFRESH";

export const currentlyPlayingHeartbeat = createHeartbeat(350, null, () => true, false, CURTENTLY_PLAYING);

export const authTokenHeartBeat = createHeartbeat(3500000, null, () => true, true, AUTH_TOKEN_REFRESH);