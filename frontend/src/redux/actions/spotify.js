import axios from "../../networking/axios";
import {store} from "../../index";

export const FETCH_CURRENT_SONG = 'FETCH_CURRENT_SONG';
export const FETCH_NEXT_SONG = 'FETCH_NEXT_SONG';
export const FETCH_PREVIOUS_SONG = 'FETCH_PREVIOUS_SONG';
export const FETCH_SHUFFLE = 'FETCH_SHUFFLE';
export const FETCH_SAVE_SONG = 'FETCH_SAVE_SONG';


export function currentlyPlaying() {
    const authKey = store.getState().spotify.spotifyToken;
    return (dispatch) => {
      let promise =  axios('spotify/player/currently-playing', {
          headers: {'Authorization': authKey},
          method: 'GET'
      });

        dispatch({
            type: FETCH_CURRENT_SONG,
            payload: promise
        })
    }
}

export function nextSong(authKey) {
    return (dispatch) => {
      let promise =  axios('spotify/player/next', {
          headers: {'Authorization': authKey},
          method: 'POST'
      });

        dispatch({
            type: FETCH_NEXT_SONG,
            payload: promise
        })
    }
}

export function prevSong(authKey) {
    return (dispatch) => {
      let promise =  axios('spotify/player/previous', {
          headers: {'Authorization': authKey},
          method: 'POST'
      });

        dispatch({
            type: FETCH_PREVIOUS_SONG,
            payload: promise
        })
    }
}

export function saveSong(authKey, songId) {
    return (dispatch) => {
      let promise =  axios('spotify/tracks', {
          headers: {'Authorization': authKey, 'Content-Type': 'application/json'},
          params: {'ids': songId},
          method: 'PUT'
      });

        dispatch({
            type: FETCH_SAVE_SONG,
            payload: promise
        })
    }
}

export function shuffleCheck(authKey, shuffleState) {
    return (dispatch) => {
      let promise =  axios('spotify/player/shuffle', {
          headers: {'Authorization': authKey},
          params: {'state': shuffleState},
          method: 'PUT'
      });

        dispatch({
            type: FETCH_SHUFFLE,
            payload: promise
        })
    }
}
