import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
//import {clearRepo, getRepos, repoSelected} from "../redux/actions/github";
//import {githubLogin} from "../redux/actions/auth";
import { spotifyLogin } from "../redux/actions/auth";
//import GithubIcon from '../../media/icons/github-logo.svg'
import { spotify } from 'react-icons-kit/fa/';
import LoadingIcon from "./LoadingIcon";
import BackButton from "./BackButton";
import axios from "../networking/axios";
import config from "../config";

class SpotifyWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      musicState: "Paused"
    }
    this.getCurrentSong = this.getCurrentSong.bind(this);
  }

  componentWillMount() {
    {/*if (this.props.gitHubToken) {
      this.props.getRepos(this.props.gitHubToken);
    }*/}
  }

  getCurrentSong(authKey) {
      console.log("AUTHKEY!!!", authKey);

      let promise = axios('spotify/currently-playing', {
          headers: {'Authorization': authKey},
          method: 'GET'
      });

      promise.then(function(response){
        console.log("--HELLOBROOOO WORLD--\n\n");
        console.log(response);
        console.log("--HELLO WORLD--\n\n");
        console.log(response.body);
      });

      return <p>"hello"</p>;
  }

  getBody() {
      return (
        <p>You've been authorized!</p>,
        this.getCurrentSong()
      );
  }

  render() {
    if (!this.props.authToken) {
      return (
        <div id="github-widget" className={"widget login"}>
          <button className={"login-button"} onClick={this.props.spotifyLogin}>
            <object data={spotify} aria-label="github login" />
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
        this.getBody()
      )
    }
  }
}


const mapStateToProps = state => ({
  authToken: state.spotify.spotifyToken,
  loading: state.spotify.loading,
  error: state.spotify.error,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  spotifyLogin
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps) (SpotifyWidget);
