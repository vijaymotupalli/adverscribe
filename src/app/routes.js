import { BrowserRouter,Route } from 'react-router-dom'
import {render} from "react-dom";
import React from "react";
import {Provider} from "react-redux";
import App from "./app";
import store from "./store";
import { ConnectedRouter, push} from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
const history = createHistory()

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App/>
        </ConnectedRouter>
    </Provider>,
    window.document.getElementById('app'));

