import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import App from './container/app';
import * as redusers from './store/reducers';

import './index.scss';

const store = createStore(combineReducers(redusers), composeWithDevTools(applyMiddleware(thunk)))

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.querySelector('#root'));
