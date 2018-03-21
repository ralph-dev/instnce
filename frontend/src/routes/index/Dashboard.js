import React, {Component} from 'react';
import Weather from "../../components/WeatherWidget";
import GitHub from "../../components/github/GitHubWidget";
import SpotifyWidget from "../../components/SpotifyWidget";
import Notes from "../../components/NotesWidget"
import TimeWidget from "../../components/TimeWidget";
import QuickLinks from "../../components/quick-links/QuickLinks";
import SettingsWidget from "../../components/SettingsWidget";
import Credits from "../../components/Credits"
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {spotifyLogin, spotifyRefresh} from "../../redux/actions/auth";

export const HOME = "HOME";
export const GITHUB = "GITHUB";
export const SPOTIFY = "SPOTIFY"
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
        }
    }

    setOpen(id) {
        this.setState({step: id});
    }

    render() {
        const components = {
          HOME: <Home/>,
          GITHUB: <GitHub />,
          SPOTIFY: <SpotifyWidget />,
          NOTES: <Notes/>,
          SETTINGS: <SettingsWidget/>,
          CREDITS: <Credits/>
        };
        console.log(this.props.fontSize);
        return (
            <div id="dashboard" style={{fontSize: `${this.props.fontSize}rem`}}>
                <QuickLinks onClick={this.setOpen.bind(this)}/>
                {components[this.state.step]}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    fontSize: state.settings.fontSize
});


const mapDispatchToProps = dispatch => bindActionCreators({
    spotifyLogin,
    spotifyRefresh
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps) (Dashboard);
