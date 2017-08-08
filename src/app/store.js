import {createStore, combineReducers, applyMiddleware} from "redux";
import logger from "redux-logger";
import thunk from 'redux-thunk';
import Login from "./reducers/loginReducer";
import User from "./reducers/userReducer";
import Tasks from "./reducers/taskReducer";
import Permissions from "./reducers/permissionsReducer";
import { composeWithDevTools } from 'redux-devtools-extension';

const composeEnhancers = composeWithDevTools({
    // Specify here name, actionsBlacklist, actionsCreators and other options
});

export default createStore(
    combineReducers({
        Login,User,Tasks,Permissions
    }),
    {},
    composeEnhancers(
        applyMiddleware(logger(),thunk))

);