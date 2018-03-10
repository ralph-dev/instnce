import React from "react";
import Cookies from 'js-cookie';
import {getRepos, githubLogin} from "../redux/actions/github";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import LoadingIcon from "./LoadingIcon";

class GitHub extends React.Component {
    constructor() {
        super();
        this.gitHubToken = Cookies.get('githubToken');
    }

    componentWillMount() {
        console.log(this.gitHubToken);
        if (this.gitHubToken) {
            this.props.getRepos(this.gitHubToken);
        }
    }

    render() {
        if(!this.gitHubToken) {
            return (
                <div id="github-widget" className={"widget"}>
                    <button onClick={this.props.githubLogin}>Login To Github</button>
                </div>
            )
        } else if (this.props.loading) {
            return (
                <div id="github-widget" className={"widget"}>
                    <LoadingIcon color="#4c8fc3" width={100} height={100}/>
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

});

const mapDispatchToProps = dispatch => bindActionCreators({
    githubLogin,
    getRepos
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps) (GitHub);