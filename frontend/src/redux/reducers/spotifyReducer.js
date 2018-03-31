import config from "../../config";
import lscache from "lscache";
import {SPOTIFY_ACCESS_TOKEN} from "../actions/auth";
import {FETCH_CURRENT_SONG, FETCH_NEXT_SONG, FETCH_PREVIOUS_SONG, FETCH_SHUFFLE} from "../actions/spotify";

const default_state = {
    error: false,
    song: "Unknown",
    loading: false,
    spotifyToken: lscache.get(config.GITHUB_LOCAL_STORE_KEY)
};

export default function (state = default_state, action) {
    switch (action.type) {
        case SPOTIFY_ACCESS_TOKEN:
            return {...state, spotifyToken: action.payload};
        case FETCH_CURRENT_SONG:
            return {...state, song: action.payload.data.item.name};
        case FETCH_NEXT_SONG:
            return {...state};
        case FETCH_PREVIOUS_SONG:
            return {...state};
        case FETCH_SHUFFLE:
            return {...state};
        default:
            return state;
    }
}
