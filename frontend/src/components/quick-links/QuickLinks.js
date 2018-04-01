import React from 'react';
import QuickLink from "./QuickLink";

import { home, githubAlt, briefcase, spotify, stickyNoteO, gear, book} from 'react-icons-kit/fa/';
import {GITHUB, HOME, NOTES, SETTINGS, SPOTIFY, JIRA, CREDITS} from "../../routes/index/Dashboard";


class QuickLinks extends React.Component {

    componentWillMount() {
        this.links = [
          {icon: home, step: HOME},
          {icon: githubAlt, step: GITHUB},
          {icon: briefcase, step: JIRA},
          {icon: spotify, step: SPOTIFY},
          {icon: stickyNoteO, step: NOTES},
          {icon: gear, step: SETTINGS},
          {icon: book, step: CREDITS}
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
