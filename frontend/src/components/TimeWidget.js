import React from 'react';
import Clock from 'react-live-clock';

const TimeWidget = () =>
    <div className="time-widget">
        <Clock format={'k:mmA'} className={"clock"}/>
        <h1>Welcome to your Instnce</h1>
    </div>;

export default TimeWidget