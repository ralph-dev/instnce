import React, { Component } from 'react';
import Weather from "../components/weather/WeatherWidget";

class App extends Component {
    render() {
    return (
      <div className="App">
          <Weather/>
      </div>
    );
  }
}

export default (App);
