import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import promiseMiddleware from "redux-promise";
import ReduxThunk from 'redux-thunk';
import {applyMiddleware, createStore} from "redux";
import indexReducer from "./redux/reducers/indexReducer";
import {Provider} from "react-redux";

import Dashboard from './routes/index/Dashboard';

import 'normalize.css';
import './css/main.scss';

const store = createStore(indexReducer, applyMiddleware(promiseMiddleware, ReduxThunk));

ReactDOM.render(
    <Provider store={store}>
        <Dashboard/>
    </Provider>, document.getElementById('root')
);