var axios = require('axios');
axios.defaults.baseURL = 'http://localhost:8000';
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
        axios.post('/login', {
            email: email,
        })
            .then(function (response,err) {
                console.log("----logged in user----",response.data)
                dispatch(setLoginPending(false));
                dispatch(setLoginSuccess(true));
                localStorage.setItem("userToken",email);
            })
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response.data);
                    dispatch(setLoginError(error.response.data.msg))
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error Message', error.message);
                }
            });
    }
}
export function getUsers() {
    return  dispatch => {
        axios.get('/users')
            .then(function(response) {
                dispatch(setUsersData(response.data))
            });
    }
}
export function setUsersData(usersData) {

    return {
        type: "SET_USERS_DATA",
        payload:usersData
    }
}
export function setUserError(userError) {

    return {
        type: "SET_USER_ERROR",
        payload:userError
    }
}
export function addUser(user) {
    return  dispatch => {
        axios.post('/users', {
            email: user.email,
            role: user.role,
            name: user.name
        })
            .then(function (response,err) {
                dispatch(getUsers());
            })
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response.data);
                    dispatch(setUserError(error.response.data.msg))
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });
    }
}