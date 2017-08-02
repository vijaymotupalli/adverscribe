var axios = require('axios');
axios.defaults.baseURL = 'http://54.254.175.129:9000';
axios.defaults.headers.post['Content-Type'] = 'application/json';

import {SET_LOGIN_PENDING,SET_LOGIN_SUCCESS,SET_LOGIN_ERROR} from './types'

export function setLoginPending(isLoginPending) {
    return {
        type: SET_LOGIN_PENDING,
        isLoginPending
    };
}

export function setLoginSuccess(isLoginSuccess) {
    return {
        type: SET_LOGIN_SUCCESS,
        isLoginSuccess
    };
}

export function setLoginError(loginError) {
    return {
        type: SET_LOGIN_ERROR,
        loginError
    }
}
export function googleLogin(email) {

    return  dispatch => {
        dispatch(setLoginPending(true));
        dispatch(setLoginSuccess(false));
        dispatch(setLoginError(null));

        if(email == "motupallivijay@gmail.com") {
            dispatch(setLoginPending(false));
            localStorage.setItem("userToken",email);
                dispatch(setLoginSuccess(true));
        }else {
            dispatch(setLoginError(error));
        }
    }
}
