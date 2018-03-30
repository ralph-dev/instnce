import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { spotifyLogin } from "../redux/actions/auth";
import { spotify } from 'react-icons-kit/fa/';
import LoadingIcon from "./LoadingIcon";
import axios from "../networking/axios";
import config from "../config";
import {Icon} from "react-icons-kit";
import {currentlyPlaying, nextSong, prevSong, shuffleCheck} from "../redux/actions/spotify";

class SpotifyWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      musicState: "Paused",
      musicShuffle: true,
      songName: "Unknown"
    };
    this.tick = this.tick.bind(this);
    setInterval(() => this.tick(), 1000);
  }

  tick() {
    if (this.props.authToken) {
        this.props.currentlyPlaying(this.props.authToken);
        this.setState({songName: this.props.song});
    }
  }

  render() {
    if (!this.props.authToken) {
      return (
        <div id="github-widget" className={"widget login"}>
          <button className={"login-button"} onClick={this.props.spotifyLogin}>
            <Icon icon={spotify} size={30}/>
            Spotify
          </button>
        </div>
      )
    } else if (this.props.loading) {
      return (
        <div id="github-widget" className={"widget"}>
          <LoadingIcon color="#4c8fc3" width={100} height={100} />
        </div>
      )
    } else if (this.props.error) {
      return (
        <div id="github-widget" className={"widget"}>
          <h1 className="error-icon">!</h1>
          <h5 className="subheading">Could Not Connect To Spotify</h5>
        </div>
      )
    } else {
      return (
        <div>
          <button onClick={() => this.props.prevSong(this.props.authToken)}>Previous Song</button>
          <p>Song: {this.state.songName}</p>
          <input id="volume" type="range" min="0" max="100" value="10" step="1"/>
          <input onClick={() => this.props.shuffleCheck(this.props.authToken, !this.state.musicShuffle)} id="shuffle" type="checkbox" placeholder="Shuffle" checked/>
          <button onClick={() => this.props.nextSong(this.props.authToken)}>Next Song</button>
        </div>
      )
    }
  }
}


const mapStateToProps = state => ({
  authToken: state.spotify.spotifyToken,
  loading: state.spotify.loading,
  error: state.spotify.error,
  song: state.spotify.song
});

const mapDispatchToProps = dispatch => bindActionCreators({
  spotifyLogin,
  currentlyPlaying,
  nextSong,
  prevSong,
  shuffleCheck
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps) (SpotifyWidget);
