import React, { Component } from 'react';
import logo from '../logo.svg';
import {bindActionCreators} from "redux";
import {getWeather} from "../redux/actions/weatherActions";
import {connect} from "react-redux";

class App extends Component {

    componentWillMount() {
        this.props.getWeather();
    }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
});


const mapDispatchToProps = dispatch => bindActionCreators({
    getWeather
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps) (App);
