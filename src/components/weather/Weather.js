import React, { Component } from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import clearDay from "../../media/WeatherIcons/Sun.svg"
import {getWeather} from "../../redux/actions/weatherActions";

const icons = {
    "clear-day": clearDay
};

class Weather extends Component {

    componentWillMount() {
        this.props.getWeather();
    }

    render() {
        return (
            <div className="weather">
                <object aria-label="weather" className="weather-icon" data={clearDay}/>
                <h2 className={"temperature"}>3°</h2>
            </div>
        );
    }
}

const mapStateToProps = state => ({
});


const mapDispatchToProps = dispatch => bindActionCreators({
    getWeather
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps) (Weather);
