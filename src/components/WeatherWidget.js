import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import clearDay from "../media/weather-icons/ClearDay.svg";
import clearNight from '../media/weather-icons/ClearNight.svg';
import rain from '../media/weather-icons/Rain.svg';
import snow from '../media/weather-icons/Snow.svg';
import sleet from '../media/weather-icons/Sleet.svg';
import wind from '../media/weather-icons/Wind.svg';
import fog from '../media/weather-icons/Fog.svg';
import cloudy from '../media/weather-icons/Cloudy.svg';
import partlyCloudyDay from '../media/weather-icons/PartlyCloudyDay.svg';
import partlyCloudyNight from '../media/weather-icons/PartlyCloudyNight.svg';


import {getWeather} from "../redux/actions/weatherActions";
import LoadingIcon from "./LoadingIcon";

const icons = {
    "clear-day": clearDay,
    "clear-night": clearNight,
    "rain": rain,
    "snow": snow,
    "sleet": sleet,
    "wind": wind,
    "fog": fog,
    "cloudy": cloudy,
    "partly-cloudy-day": partlyCloudyDay,
    "partly-cloudy-night": partlyCloudyNight,
};

class Weather extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.getWeather();
    }

    render() {
        console.log(this.props.daily);
        if (this.props.error) {
            return (
            <div className="weather">
                <h1 className="error-icon">!</h1>
                <h5 className="subheading">Could Not Get Weather</h5>
            </div>);
        } else if(this.props.currently === null || this.props.daily === null) {
            return (
            <div className="weather">
                <LoadingIcon/>
                <h5 className="subheading">Loading Weather</h5>
            </div>);
        } else {
            return (
                <div className="weather">
                    <object aria-label="weather" className="weather-icon" data={partlyCloudyDay}/>
                    <h2 className={"temperature"}>{Math.round(this.props.currently.temperature)}°</h2>
                    <h5 className={"subheading"}>{this.props.currently.summary}</h5>
                    <h5 className={"subheading"}>{Math.round(this.props.daily.temperatureHigh)}° / {Math.round(this.props.daily.temperatureLow)}°</h5>
                </div>
            )
        }
    }
}

const mapStateToProps = state => ({
    error: state.weather.error,
    currently: (state.weather.weather) ? state.weather.weather.currently : null,
    daily: (state.weather.weather) ? state.weather.weather.daily.data[0]: null
});


const mapDispatchToProps = dispatch => bindActionCreators({
    getWeather
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Weather);
