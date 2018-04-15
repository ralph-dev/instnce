import React, {Component} from 'react';
import Weather from "../../components/WeatherWidget";
import GitHub from "../../components/github/GitHubWidget";
import JiraWidget from "../../components/JiraWidget";
import SpotifyWidget from "../../components/spotify/SpotifyWidget";
import Notes from "../../components/NotesWidget"
import TimeWidget from "../../components/TimeWidget";
import QuickLinks from "../../components/quick-links/QuickLinks";
import SettingsWidget from "../../components/SettingsWidget";
import Credits from "../../components/Credits"
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {spotifyLogin, spotifyRefresh} from "../../redux/actions/auth";
import '../../components/i18n';
import * as heartbeats from "heartbeats";
import {currentlyPlaying} from "../../redux/actions/spotify";

export const HOME = "HOME";
export const GITHUB = "GITHUB";
export const JIRA = "JIRA";
export const SPOTIFY = "SPOTIFY";
export const NOTES = "NOTES";
export const SETTINGS = "SETTINGS";
export const CREDITS = "CREDITS";

const Home = () =>
    <div>
        <Weather/>
        <TimeWidget/>
    </div>;


class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            step: HOME
        };
        this.setOpen = this.setOpen.bind(this);
        this.heartbeat =  new heartbeats.createHeart(1000);
        this.heartbeat.createEvent(3600, {}, this.props.spotifyRefresh)
    }

    setOpen(id) {
        this.setState({step: id});
    }

    render() {
        const components = {
          HOME: <Home/>,
          GITHUB: <GitHub />,
          SPOTIFY: <SpotifyWidget />,
          JIRA: <JiraWidget />,
          NOTES: <Notes/>,
          SETTINGS: <SettingsWidget/>,
          CREDITS: <Credits/>
        };

        if (this.state.step === SPOTIFY && this.props.authKey) {
            this.heartbeat.createEvent(1, {name: "currently_playing"}, this.props.currentlyPlaying);
        } else {
            this.heartbeat.killEvent("currently_playing");
        }

        return (
            <div id="dashboard" style={{fontSize: `${this.props.fontSize}rem`}}>
                <QuickLinks onClick={this.setOpen}/>
                {components[this.state.step]}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    fontSize: state.settings.fontSize,
    authKey: state.spotify.spotifyToken
});


const mapDispatchToProps = dispatch => bindActionCreators({
    spotifyLogin,
    spotifyRefresh,
    currentlyPlaying
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps) (Dashboard);
