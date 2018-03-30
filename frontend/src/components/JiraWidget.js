import React from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {getIssues, jiraLogin} from "../redux/actions/jira";
import LoadingIcon from "./LoadingIcon";

// URL: https://wolfbeacon.atlassian.net
// URL of Instnce: https://wolfbeacon.atlassian.net/secure/RapidBoard.jspa?rapidView=4&projectKey=IN&selectedIssue=IN-10
// Pure URL of Instnce: https://wolfbeacon.atlassian.net/secure/RapidBoard.jspa?projectKey=IN

class JiraWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: "",
            username: "",
            password: ""
        }
    }

    componentWillMount() {
        if (this.props.auth) {
            this.props.getIssues(this.props.auth);
        }
    }

    urlChanged(e) {
        e.preventDefault();
        this.setState({
            url: e.target.value
        });
    }

    usernameChanged(e) {
        e.preventDefault();
        this.setState({
            username: e.target.value
        });
    }
    passwordChanged(e) {
        e.preventDefault();
        this.setState({
            password: e.target.value
        });
    }


    submitClicked(e) {
        e.preventDefault();
        this.props.jiraLogin(this.state);
    }

    render() {
        if (!this.props.auth) {
            return (
                <form className="widget" onSubmit={this.submitClicked.bind(this)}>
                    <input type="url" placeholder="Url" name="jira-url" value={this.state.url} onChange={this.urlChanged.bind(this)}/>
                    <input type="text" name="name" placeholder="Username" value={this.state.username} onChange={this.usernameChanged.bind(this)}/>
                    <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.passwordChanged.bind(this)}/>
                    <input type="submit" value="Submit"/>
                </form>
            )
        } else if (this.props.issues) {
            return (<div className="widget">
                {this.props.issues.map(issue => <h1 key={issue.id}>{issue.key}-{issue.fields.summary}</h1>)}
            </div>)
        } else {
            return (
            <div className="widget">
                <LoadingIcon width={100} height={100} color={"#4c8fc3"}/>
                <h5 className="subheading">Loading Jira</h5>
            </div>
            )
        }

    }
}


const mapStateToProps = state => ({
    auth: state.jira.auth,
    issues: state.jira.issues
});

const mapDispatchToProps = dispatch => bindActionCreators({
    jiraLogin,
    getIssues
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(JiraWidget);
