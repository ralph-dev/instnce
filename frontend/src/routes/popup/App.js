import React, { Component } from 'react';
import "../../css/components/_popUp.scss";
import 'react-tabs/style/react-tabs.scss';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

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
            <div className="linkObj">
                <p className="linkData">{this.props.value}</p>
                <button className="linkCopy" onClick={this.updateClipboard} title="Copy Link" />
            </div>
        );
    }
}

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: '',
            links: JSON.parse(localStorage.getItem("links")) || []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteLink = this.deleteLink.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.value.length >= 1) {
          let newLinks = this.state.links.slice();
          newLinks.push(this.state.value);
          this.setState({ links: newLinks });
          this.setState({value: ""});
          localStorage.setItem("links", JSON.stringify(newLinks));
        }
    }

    deleteLink(event) {
        let newLinks = this.state.links.slice();
        let index = newLinks.indexOf(event.target.value);
        newLinks.splice(index, 1);
        this.setState({ links: newLinks });
        localStorage.setItem("links", JSON.stringify(newLinks));
    }

    render() {
        return (
            <div className="App">
                <Tabs>
                    <TabList>
                        <Tab>Links</Tab>
                        <Tab>Settings</Tab>
                    </TabList>
                    <TabPanel>
                        <div className="Links">
                            {this.state.links.map(link => <Link value={link} />)}
                        </div>
                        <div className="AddLink">
                            <form>
                                <textarea className="typeLink"
                                    value={this.state.value} onChange={this.handleChange}
                                    placeholder="Insert a new link" />
                                <input className="saveLink" type="submit" value="Save Link" onClick={this.handleSubmit} />
                            </form>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="Links">
                            {this.state.links.map(link =>
                                <div className="linkObj">
                                    <p className="linkSetting">{link}</p>
                                    <button className="linkDelete" onClick={this.deleteLink} title="Delete Link" value={link} />
                                </div>
                            )}
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        );
    }
}

export default (App);
