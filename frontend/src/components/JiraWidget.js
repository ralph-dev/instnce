import React from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {jiraLogin} from "../redux/actions/jira";
import { I18n, Trans } from 'react-i18next';

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


    }

    render() {
        return (
          <I18n ns="translations">
            {
              (t, { i18n }) => (
                <form className="widget" onSubmit={this.submitClicked.bind(this)}>
                    <input type="url" placeholder="Url" name="jira-url" value={this.state.url} onChange={this.urlChanged.bind(this)}/>
                    <input type="text" name="name" placeholder={t('username')} value={this.state.username} onChange={this.usernameChanged.bind(this)}/>
                    <input type="password" name="password" placeholder={t('password')} value={this.state.password} onChange={this.passwordChanged.bind(this)}/>
                    <input type="submit" value={t('set')}/>
                </form>
              )
            }
          </I18n>
        )
    }
}


const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({
    jiraLogin
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(JiraWidget);
