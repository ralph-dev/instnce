import React, { Component } from 'react';
import Weather from "../../components/WeatherWidget";

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
