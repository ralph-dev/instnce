import React from 'react';
import {Icon} from "react-icons-kit";

const QuickLink = ({icon, onClick}) =>
    <div className="quick-link">
        <Icon icon={icon} size={25} onClick={onClick}/>
    </div>;

export default QuickLink;