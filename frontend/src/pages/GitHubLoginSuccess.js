import React, { Component } from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import LoadingIcon from "../components/LoadingIcon";

class GitHubLoginSuccess extends Component {

    render() {
        return (
            <div id="github-success">
                <LoadingIcon color={"#fff"} width={250} height={250}/>
            </div>
        );
    }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps) (GitHubLoginSuccess);