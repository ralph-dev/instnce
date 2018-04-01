import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { spotifyLogin, spotifyRefresh } from "../redux/actions/auth";
import { spotify } from 'react-icons-kit/fa/';
import LoadingIcon from "./LoadingIcon";
import axios from "../networking/axios";
import config from "../config";
import {Icon} from "react-icons-kit";
import {currentlyPlaying, nextSong, prevSong, saveSong, shuffleCheck} from "../redux/actions/spotify";
import {I18n} from 'react-i18next';

class SpotifyWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      musicState: "Paused",
      musicShuffle: true,
      songName: "Unknown",
      songId: "Unknown",
      songImg: "Unknown",
      songArtist: "Unknown"
    };
    this.updateDetails = this.updateDetails.bind(this);
    this.updateToken = this.updateToken.bind(this);
    setInterval(() => this.updateDetails(), 250);
    // 3500000, represents token expiration date
    setInterval(() => this.updateToken(), 3500000);
    this.updateToken();
  }

  updateToken() {
    this.props.spotifyRefresh;
  }

  updateDetails() {
    if (this.props.authToken) {
        this.props.currentlyPlaying(this.props.authToken);
        this.setState({songName: this.props.song});
        this.setState({songId: this.props.songId});
        this.setState({songImg: this.props.songImg});
        this.setState({songArtist: this.props.songArtist});
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
        <I18n ns="translations">
          {
            (t, { i18n }) => (
              <div className="widget">
                <div>
                  <img className="songImg" src={this.state.songImg}/>
                  <p><b>{t('song')}: </b><i>{this.state.songName}</i></p>
                  <p><b>{t('artist')}: </b><i>{this.state.songArtist}</i></p>
                </div>
                <div>
                  <button className="sp-button" onClick={() => this.props.prevSong(this.props.authToken)}>{t('previoussong')}</button>
                  <button className="sp-button" onClick={() => this.props.saveSong(this.props.authToken, this.state.songId)}>{t('savesong')}</button>
                  <button className="sp-button" onClick={() => this.props.nextSong(this.props.authToken)}>{t('nextsong')}</button>
                </div>
                <div className="options">
                  <label>{t('shuffle')}<input onClick={() => this.props.shuffleCheck(this.props.authToken, !this.state.musicShuffle)} id="shuffle" type="checkbox" placeholder="Shuffle"/></label>
                </div>
              </div>
            )
          }
        </I18n>
      )
    }
  }
}


const mapStateToProps = state => ({
  authToken: state.spotify.spotifyToken,
  loading: state.spotify.loading,
  error: state.spotify.error,
  song: state.spotify.song,
  songId: state.spotify.songId,
  songImg: state.spotify.songImg,
  songArtist: state.spotify.songArtist
});

const mapDispatchToProps = dispatch => bindActionCreators({
  spotifyLogin,
  spotifyRefresh,
  currentlyPlaying,
  nextSong,
  prevSong,
  saveSong,
  shuffleCheck
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps) (SpotifyWidget);
