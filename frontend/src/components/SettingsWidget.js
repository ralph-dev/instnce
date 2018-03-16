import React from 'react';
import lscache from 'lscache';
import config from "../config";
import {bindActionCreators} from "redux";
import {getLocationAndWeather} from "../redux/actions/weatherActions";
import {connect} from "react-redux";

class SettingsWidget extends React.Component {
    componentWillMount() {
        this.location = lscache.get(config.LOCATION_LOCAL_STORE_KEY);
    }

    render() {
        return(
            <div className="widget settings-widget">
                <h1>Settings</h1>
                <div className="weather-settings section">
                    <h2>Weather</h2>
                    <p>Current Location: {this.location.lat}, {this.location.long}</p>
                    <button className="settings-button" onClick={this.props.updateLocation}>Refresh</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
});


const mapDispatchToProps = dispatch => bindActionCreators({
    updateLocation: () => getLocationAndWeather(true)
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps) (SettingsWidget);