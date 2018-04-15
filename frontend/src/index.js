import React from 'react';
import ReactDOM from 'react-dom';
import promiseMiddleware from "redux-promise";
import ReduxThunk from 'redux-thunk';
import {applyMiddleware, createStore} from "redux";
import createSagaMiddleware from 'redux-saga'

import indexReducer from "./redux/reducers/indexReducer";
import {Provider} from "react-redux";

import {heartbeatSaga} from "./components/spotify/HeartbeatSaga";
import {authTokenHeartBeat, currentlyPlayingHeartbeat} from "./components/spotify/Heartbeat";

import Dashboard from './routes/index/Dashboard';

import 'normalize.css';
import './css/main.scss';


const sagaMiddleware = createSagaMiddleware();

export const store = createStore(indexReducer, applyMiddleware(promiseMiddleware, currentlyPlayingHeartbeat, authTokenHeartBeat, ReduxThunk, sagaMiddleware));

sagaMiddleware.run(heartbeatSaga);

ReactDOM.render(
    <Provider store={store}>
        <Dashboard/>
    </Provider>, document.getElementById('root')
);