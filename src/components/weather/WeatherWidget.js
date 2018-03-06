import React, { Component } from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import clearDay from "../../media/weather-icons/ClearDay.svg";
import clearNight from '../../media/weather-icons/ClearNight.svg';
import rain from '../../media/weather-icons/Rain.svg';
import snow from '../../media/weather-icons/Snow.svg';
import sleet from '../../media/weather-icons/Sleet.svg';
import wind from '../../media/weather-icons/Wind.svg';
import fog from '../../media/weather-icons/Fog.svg';
import cloudy from '../../media/weather-icons/Cloudy.svg';
import partlyCloudyDay from '../../media/weather-icons/PartlyCloudyDay.svg';
import partlyCloudyNight from '../../media/weather-icons/PartlyCloudyNight.svg';


import {getWeather} from "../../redux/actions/weatherActions";

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

    componentWillMount() {
        this.props.getWeather();
    }

    render() {
        console.log(this.props.weather);
        return (
            <div className="weather">
                <object aria-label="weather" className="weather-icon" data={partlyCloudyDay}/>
                <h2 className={"temperature"}>3°</h2>
                <h5 className={"high-low"}>{(this.props.weather === null)? "Hello" :this.props.weather.currently.summary}</h5>
                <h5 className={"high-low"}>5°/4°</h5>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    weather: state.weather.weather
});


const mapDispatchToProps = dispatch => bindActionCreators({
    getWeather
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps) (Weather);
