import React, {Component} from 'react';
import Weather from "../../components/WeatherWidget";
import GitHub from "../../components/github/GitHubWidget";
import Notes from "../../components/NotesWidget"
import TimeWidget from "../../components/TimeWidget";
import QuickLinks from "../../components/quick-links/QuickLinks";

export const HOME = 0;
export const GITHUB = 1;
export const NOTES = 2;

const Home = () =>
    <div>
        <Weather/>
        <TimeWidget/>
    </div>;

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            open: HOME
        }
    }

    setOpen(id) {
        this.setState({open: id});
    }

    render() {
        const components = [<Home/>, <GitHub/>, <Notes/>];
        return (
            <div id="dashboard">
                <QuickLinks onClick={this.setOpen.bind(this)}/>
                {components[this.state.open]}
            </div>
        );
    }
}


export default Dashboard;
