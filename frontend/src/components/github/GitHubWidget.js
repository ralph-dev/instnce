import React from "react";
import {clearRepo, getRepos, repoSelected} from "../../redux/actions/github";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import LoadingIcon from "../LoadingIcon";
import GithubIcon from '../../media/icons/github-logo.svg'
import BackButton from "../BackButton";
import {githubLogin} from "../../redux/actions/auth";

class GitHub extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            className: "widget",
        };
    }


    componentWillMount() {
        if (this.props.gitHubToken) {
            this.props.getRepos(this.props.gitHubToken);
        }
    }

    getBody() {
        if (this.props.repo) {
            return (
                <div id="github-widget" className={"widget"}>
                    <div id="github-nav">
                        <BackButton color={"#ffffff"} width={50} height={50} onClick={this.props.clearRepo} hoverColor={"#000000"}/>
                        {(this.props.pulls) ? this.props.pulls.map(pr =>
                            <li className={"github-list-item"} key={pr.id}>
                                <h3 className="github-list-name">{pr.title}</h3>
                            </li>): null}
                    </div>
                </div>
            )
        } else if (this.props.repos) {
            return (
                <div id="github-widget" className={"widget"}>
                    <ul className={"repo-list"}>
                        <h1 className="title">GitHub</h1>
                        {this.props.repos.map((repo) =>
                            <li className={"github-list-item"}
                                key={repo.id} onClick={() => this.props.repoSelected(this.props.gitHubToken, repo)}>
                                <h3 className="github-list-name">{repo.name}</h3>
                            </li>)}
                    </ul>
                </div>

            );
        }
    }

    render() {
        if (!this.props.gitHubToken) {
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
              this.getBody()
            )
        }

    }
}

const mapStateToProps = state => ({
    loading: state.github.loading,
    repos: state.github.repos,
    error: state.github.error,
    repo: state.github.repo,
    gitHubToken: state.github.gitHubToken,
    pulls: state.github.pulls
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getRepos,
    clearRepo,
    githubLogin,
    repoSelected
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GitHub);