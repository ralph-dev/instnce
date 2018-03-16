import React from 'react';
import QuickLink from "./QuickLink";

import {home, githubAlt, stickyNoteO, gear} from 'react-icons-kit/fa/';
import {GITHUB, HOME, NOTES, SETTINGS} from "../../routes/index/Dashboard";


class QuickLinks extends React.Component {

    componentWillMount() {
        this.links = [
            {icon: home, step: HOME},
            {icon: githubAlt, step: GITHUB},
            {icon: stickyNoteO, step: NOTES},
            {icon: gear, step: SETTINGS}
        ];
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