import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
//import {clearRepo, getRepos, repoSelected} from "../redux/actions/github";
//import {githubLogin} from "../redux/actions/auth";
//import { spotifyLogin } from "../redux/actions/auth";
//import GithubIcon from '../../media/icons/github-logo.svg'
import { briefcase } from 'react-icons-kit/fa/';
import LoadingIcon from "./LoadingIcon";
import BackButton from "./BackButton";
import axios from "../networking/axios";

// URL: https://wolfbeacon.atlassian.net
// URL of Instnce: https://wolfbeacon.atlassian.net/secure/RapidBoard.jspa?rapidView=4&projectKey=IN&selectedIssue=IN-10
// Pure URL of Instnce: https://wolfbeacon.atlassian.net/secure/RapidBoard.jspa?projectKey=IN

class JiraWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <form>
        <label>
          Jira Log-In
          <input type="text" name="name" placeholder="Username" />
          <input type="text" name="password" placeholder="Password" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}


const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps) (JiraWidget);
