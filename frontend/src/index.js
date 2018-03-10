import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import promiseMiddleware from "redux-promise";
import ReduxThunk from 'redux-thunk';
import {applyMiddleware, createStore} from "redux";
import indexReducer from "./redux/reducers/indexReducer";
import {Provider} from "react-redux";
import {ConnectedRouter, routerMiddleware} from "react-router-redux";
import createHistory from 'history/createBrowserHistory';
import {Route, Switch} from "react-router";

import GitHubLoginSuccess from "./pages/GitHubLoginSuccess";
import Dashboard from './pages/Dashboard';

import 'normalize.css';
import './css/main.scss';

const history = createHistory();

const store = createStore(indexReducer, applyMiddleware(promiseMiddleware, ReduxThunk, routerMiddleware(history)));

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <Route exact path = '/' component={Dashboard}/>
                <Route path = '/githubSuccess' component={GitHubLoginSuccess}/>
            </Switch>
        </ConnectedRouter>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
