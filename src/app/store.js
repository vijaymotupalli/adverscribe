import {createStore, combineReducers, applyMiddleware} from "redux";
import logger from "redux-logger";
import thunk from 'redux-thunk';
import Login from "./reducers/loginReducer";
import { composeWithDevTools } from 'redux-devtools-extension';

const composeEnhancers = composeWithDevTools({
    // Specify here name, actionsBlacklist, actionsCreators and other options
});

export default createStore(
    combineReducers({
        Login
    }),
    {},
    composeEnhancers(
        applyMiddleware(logger(),thunk))

);