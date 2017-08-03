import {createStore, combineReducers, applyMiddleware} from "redux";
import logger from "redux-logger";
import thunk from 'redux-thunk';
import Login from "./reducers/loginReducer";
import User from "./reducers/userReducer";
import { composeWithDevTools } from 'redux-devtools-extension';
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
const history = createHistory()
const middleware = routerMiddleware(history)
const composeEnhancers = composeWithDevTools({

});

export default createStore(
    combineReducers({
        Login,User,router: routerReducer
    }),
    {},
    composeEnhancers(
        applyMiddleware(middleware,logger(),thunk))

);