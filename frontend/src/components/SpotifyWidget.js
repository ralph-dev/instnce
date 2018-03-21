import React from 'react';
import lscache from 'lscache';
import config from "../config";
import { bindActionCreators } from "redux";
import { getLocationAndWeather } from "../redux/actions/weatherActions";
import { connect } from "react-redux";
import { setFontSize } from "../redux/actions/settings";
import { spotify } from 'react-icons-kit/fa/';

class SpotifyWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      musicState: "Paused"
    }
  }

  componentWillMount() {
    {/*if (this.props.gitHubToken) {
      this.props.getRepos(this.props.gitHubToken);
    }*/}
  }


  render() {
  return (<div><p>Please attach Spotify OAuth</p></div>)
    {/*if (!this.props.gitHubToken) {
      return (
        <div id="github-widget" className={"widget login"}>
          <button className={"login-button"} onClick={this.props.githubLogin}>
            <object data={GithubIcon} aria-label="github login" />
            Github
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
          <h5 className="subheading">Could Not Connect To GitHub</h5>
        </div>
      )
    } else {
      return (
        this.getBody()
      )
    }*/}
  }
}

export default SpotifyWidget;