import React from "react";
import Cookies from 'js-cookie';
import {clearRepo, getRepos, githubLogin, repoSelected} from "../../redux/actions/github";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import LoadingIcon from "../LoadingIcon";
import GithubIcon from '../../media/icons/github-logo.svg'
import BackButton from "../BackButton";
import config from "../../config";

class GitHub extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            className: "widget",
        };
        this.gitHubToken = localStorage.getItem(config.GITHUB_LOCAL_STORE_KEY);
        if (this.gitHubToken) {
            props.getRepos(this.gitHubToken);
        }
    }


    getBody() {
        console.log(this.props.repos);
        if (this.props.repo === null) {
            return (
                <div id="github-widget" className={"widget"}>
                    <ul className={"repo-list"}>
                        <h1 className="title">GitHub</h1>
                        {this.props.repos.map((repo) =>
                            <li className={"github-repo"}
                                key={repo.id} onClick={() => this.props.repoSelected(this.gitHubToken, repo)}>
                                <h3 className="repo-name">{repo.name}</h3>
                            </li>)}
                    </ul>
                </div>

            );
        } else {
            return(
                <div id="github-widget" className={"widget"}>
                    <div id="github-nav">
                        <BackButton color={"#adadad"} width={50} height={50} onClick={this.props.clearRepo} hoverColor={"#000000"}/>
                    </div>
                </div>
            )
        }
    }

    render() {
        if (!this.gitHubToken) {
            return (
                <div id="github-widget" className={"widget login"}>
                    <button className={"login-button"} onClick={githubLogin}>
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
              this.getBody()
            )
        }

    }
}

const mapStateToProps = state => ({
    loading: state.github.loading,
    repos: state.github.repos,
    error: state.github.error,
    repo: state.github.repo
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getRepos,
    clearRepo,
    repoSelected: (authKey, repo) => repoSelected(repo)
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GitHub);