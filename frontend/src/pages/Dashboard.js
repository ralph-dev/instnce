import React, { Component } from 'react';
import Weather from "../components/WeatherWidget";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {githubLogin} from "../redux/actions/github";

class Dashboard extends Component {
    render() {
    return (
      <div className="App">
          <Weather/>
          <button onClick={this.props.githubLogin}>Login To Github</button>
      </div>
    );
  }
}
const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => bindActionCreators({
    githubLogin
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps) (Dashboard);
