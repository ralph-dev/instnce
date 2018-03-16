import React, {Component} from 'react';
import Weather from "../../components/WeatherWidget";
import GitHub from "../../components/github/GitHubWidget";
import Notes from "../../components/NotesWidget"
import TimeWidget from "../../components/TimeWidget";
import QuickLinks from "../../components/quick-links/QuickLinks";
import SettingsWidget from "../../components/SettingsWidget";

export const HOME = "HOME";
export const GITHUB = "GITHUB";
export const NOTES = "NOTES";
export const SETTINGS = "SETTINGS";

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
        const components = {HOME: <Home/>, GITHUB: <GitHub/>, NOTES: <Notes/>, SETTINGS: <SettingsWidget/>};
        return (
            <div id="dashboard">
                <QuickLinks onClick={this.setOpen.bind(this)}/>
                {components[this.state.step]}
            </div>
        );
    }
}


export default Dashboard;
