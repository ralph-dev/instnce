import React from 'react';
import lscache from 'lscache';
import config from "../config";
import {bindActionCreators} from "redux";
import {getLocationAndWeather} from "../redux/actions/weatherActions";
import {connect} from "react-redux";
import {setFontSize} from "../redux/actions/settings";

class SettingsWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fontSize: props.fontSize
        }
    }

    componentWillMount() {
        this.location = lscache.get(config.LOCATION_LOCAL_STORE_KEY);
    }

    setFontSize(e) {
        this.setState({
            fontSize: e.target.value
        });
    }

    submitFontSize() {
        this.props.setFontSize(this.state.fontSize);
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
                <div className={"section"}>
                    <h2>Font Size</h2>
                    <p style={{fontSize: `${this.state.fontSize}rem`}}>Aa</p>
                    <input type="range" min="0.5" max="2" step="0.1" value={this.state.fontSize} onChange={this.setFontSize.bind(this)}/>
                    <button className="font-size-button settings-button" onClick={this.submitFontSize.bind(this)}>Set</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    fontSize: state.settings.fontSize
});


const mapDispatchToProps = dispatch => bindActionCreators({
    updateLocation: () => getLocationAndWeather(true),
    setFontSize
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps) (SettingsWidget);