import React, { Component } from 'react';
import Weather from "../../components/WeatherWidget";

class Link extends Component {
    constructor(props) {
        super(props);

        this.updateClipboard = this.updateClipboard.bind(this);
    }


    updateClipboard(event) {
        var inp = document.createElement('input');
        document.querySelector('.linkData').append(inp);
        inp.value = this.props.value;
        inp.select();
        document.execCommand('copy');
        inp.remove();
    }

    render() {
        return (
            <div>
                <p className="linkData">{this.props.value}</p>
                <button onClick={this.updateClipboard}>Save Link</button>
            </div>
        );
    }
}

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            links: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        let newLinks = this.state.links.slice();
        newLinks.push(this.state.value);
        this.setState({ links: newLinks });
    }

    render() {
        return (
            <div className="App">
                <div className="Links">
                    {this.state.links.map(link =>
                        <Link value={link} />
                    )}
                </div>
                <div className="AddLink">
                    <form>
                        <label>
                            Add Quick Link
                            <textarea value={this.state.value} onChange={this.handleChange} />
                        </label>
                        <input type="submit" value="Save Link" onClick={this.handleSubmit} />
                    </form>
                </div>
            </div>
        );
    }
}

export default (App);