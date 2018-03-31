import axios from "../../networking/axios";

export const FETCH_CURRENT_SONG = 'FETCH_CURRENT_SONG';
export const FETCH_NEXT_SONG = 'FETCH_NEXT_SONG';
export const FETCH_PREVIOUS_SONG = 'FETCH_PREVIOUS_SONG';
export const FETCH_SHUFFLE = 'FETCH_SHUFFLE';


export function currentlyPlaying(authKey) {
    console.log("Auth", authKey);
    return (dispatch) => {
      let promise =  axios('spotify/currently-playing', {
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
    console.log("AuthorizationKey", authKey);
    return (dispatch) => {
      let promise =  axios('spotify/next', {
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
    console.log("Auth", authKey);
    return (dispatch) => {
      let promise =  axios('spotify/previous', {
          headers: {'Authorization': authKey},
          method: 'POST'
      });

        dispatch({
            type: FETCH_PREVIOUS_SONG,
            payload: promise
        })
    }
}

export function shuffleCheck(authKey, shuffleState) {
    console.log("Auth", authKey);
    console.log(shuffleState);
    return (dispatch) => {
      let promise =  axios('spotify/shuffle', {
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
