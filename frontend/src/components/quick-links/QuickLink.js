import React from 'react';
import {Icon} from "react-icons-kit";

const QuickLink = ({icon, onClick}) =>
    <div className="quick-link" onClick={onClick}>
        <Icon icon={icon} size={25}/>
    </div>;

export default QuickLink;
