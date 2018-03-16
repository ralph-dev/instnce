import React from 'react';
import QuickLink from "./QuickLink";

import {home, githubAlt, stickyNoteO} from 'react-icons-kit/fa/';
import {GITHUB, HOME, NOTES} from "../../routes/index/Dashboard";


class QuickLinks extends React.Component {

    componentWillMount() {
        this.links = [
            {icon: home, step: HOME},
            {icon: githubAlt, step: GITHUB},
            {icon: stickyNoteO, step: NOTES}];
    }

    render(){
        return(
            <div className="quick-links">
                {this.links.map((link, index) => <QuickLink key={index} icon={link.icon} onClick={() => this.props.onClick(link.step)}/>)}
            </div>

        )
    }
}

export default QuickLinks;