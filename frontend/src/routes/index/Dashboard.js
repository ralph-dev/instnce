import React, { Component } from 'react';
import Weather from "../../components/WeatherWidget";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import GitHub from "../../components/github/GitHubWidget";
import Notes from "../../components/NotesWidget"

class Dashboard extends Component {
    getContentClassNames() {
        if (this.props.focus) {
            return "content expanded"
        } else {
            return "content"
        }
    }

    render() {
    return (
      <div id="dashboard">
          <Weather/>
          <div className={this.getContentClassNames()}>
              <GitHub/>
              {/*<GitHub/>*/}
              <Notes/>
          </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    focus: state.github.focus
});

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps) (Dashboard);
