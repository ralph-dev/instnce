import React, { Component } from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

class App extends Component {

    componentWillMount() {
        this.props.getWeather();
    }

    render() {
        return (
            <div className="weather">

            </div>
        );
    }
}

const mapStateToProps = state => ({
});


const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps) (App);
