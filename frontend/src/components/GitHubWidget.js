import React from "react";
import Cookies from 'js-cookie';
import {getRepos, githubLogin} from "../redux/actions/github";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import LoadingIcon from "./LoadingIcon";
import GithubIcon from '../media/icons/github-logo.svg'

class GitHub extends React.Component {
    constructor(props) {
        super(props);
        this.gitHubToken = Cookies.get('githubToken');
        if (this.gitHubToken) {
            props.getRepos(this.gitHubToken);
        }
    }

    render() {
        if (!this.gitHubToken) {
            return (
                <div id="github-widget" className={"widget login"}>
                    <button className={"login-button"} onClick={this.props.githubLogin}>
                        <object data={GithubIcon} aria-label="github login"/>
                        Github
                    </button>
                </div>
            )
        } else if (this.props.loading) {
            return (
                <div id="github-widget" className={"widget"}>
                    <LoadingIcon color="#4c8fc3" width={100} height={100}/>
                </div>
            )
        } else if (this.props.error) {
            return (
                <div id="github-widget" className={"widget"}>
                    <h1 className="error-icon">!</h1>
                    <h5 className="subheading">Could Not Connect To GitHub</h5>
                </div>
            )
        } else {
            return (
                <div id="github-widget" className={"widget"}>
                    <h1 className="title">GitHub</h1>
                </div>
            )
        }

    }
}

const mapStateToProps = state => ({
    loading: state.github.loading,
    repos: state.github.repos,
    error: state.github.error
});

const mapDispatchToProps = dispatch => bindActionCreators({
    githubLogin,
    getRepos
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GitHub);