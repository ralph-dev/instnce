import React from 'react';
import ReactDOM from 'react-dom';
import './css/main.scss';
import App from './routes/index/App';
import registerServiceWorker from './registerServiceWorker';
import promiseMiddleware from "redux-promise";
import ReduxThunk from 'redux-thunk';
import {applyMiddleware, createStore} from "redux";
import indexReducer from "./redux/reducers/indexReducer";
import {Provider} from "react-redux";

const store = createStore(indexReducer, applyMiddleware(promiseMiddleware, ReduxThunk));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));
registerServiceWorker();
