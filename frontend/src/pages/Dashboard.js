import React, { Component } from 'react';
import Weather from "../components/WeatherWidget";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import GitHub from "../components/GitHubWidget";

class Dashboard extends Component {
    render() {
    return (
      <div id="dashboard">
          <Weather/>
          <div className="content">
              <GitHub/>
              {/*<GitHub/>*/}
          </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps) (Dashboard);
