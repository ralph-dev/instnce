import config from "../../config";
import lscache from "lscache";
import {SPOTIFY_ACCESS_TOKEN} from "../actions/auth";
import {FETCH_CURRENT_SONG, FETCH_NEXT_SONG, FETCH_PREVIOUS_SONG, FETCH_SHUFFLE, FETCH_SAVE_SONG, FETCH_PLAYBACK_INFO} from "../actions/spotify";

const default_state = {
    error: false,
    song: "Unknown",
    loading: false,
    spotifyToken: lscache.get(config.SPOTIFY_ACCESS_LOCAL_STORE_KEY)
};

export default function (state = default_state, action) {
    switch (action.type) {
        case SPOTIFY_ACCESS_TOKEN:
            return {...state, spotifyToken: action.payload};
        case FETCH_CURRENT_SONG:
              if (action.payload.data.item){
                return {
                  ...state,
                  song: action.payload.data.item.name,
                  songId: action.payload.data.item.id,
                  songImg: action.payload.data.item.album.images[0].url,
                  songArtist: action.payload.data.item.artists[0].name
                };
              } else {
                return {
                  ...state
                };
              }
        case FETCH_NEXT_SONG:
            return {...state};
        case FETCH_PREVIOUS_SONG:
            return {...state};
        case FETCH_SHUFFLE:
            return {...state};
        case FETCH_SAVE_SONG:
            return {...state};
        case FETCH_PLAYBACK_INFO:
            if (action.payload.data){
              return {
                ...state,
                shuffle_state: action.payload.data.shuffle_state
              };
            } else {
              return {
                ...state
              };
            }
        default:
            return state;
    }
}
