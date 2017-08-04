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
export function setTaskError(taskError) {

    return {
        type: "SET_TASK_ERROR",
        payload:taskError
    }
}
export function setTask(task) {

    return {
        type: "SET_TASK",
        payload:task
    }
}
export function clearUserError(userError) {

    return {
        type: "CLEAR_USER_ERROR",
        payload:userError
    }
}
export function clearUserData(flag) {

    return {
        type: "CLEAR_USER_DATA",
        payload:flag
    }
}
export function addUser(user) {
    return  dispatch => {
        return new Promise (function (resolve,reject) {
            axios.post('/users', {
                email: user.email,
                role: user.role,
                name: user.name
            })
                .then(function (response,err) {
                    dispatch(getUsers());
                    dispatch(clearUserData(true))
                    dispatch(setUserError(""));
                    resolve()
                })
                .catch(function (error) {
                    if (error.response) {
                        dispatch(setUserError(error.response.data.msg.message ? error.response.data.msg.message :error.response.data.msg))
                    }
                    reject()
                });
        })

    }
}
export function addTask(task) {
    return  dispatch => {
        return new Promise (function (resolve,reject) {
            console.log(task);

            dispatch(setTask(task));

            // axios.post('/users', {
            //     email: user.email,
            //     role: user.role,
            //     name: user.name
            // })
            //     .then(function (response,err) {
            //         dispatch(getUsers());
            //         dispatch(clearUserData(true))
            //         dispatch(setUserError(""));
            //         resolve()
            //     })
            //     .catch(function (error) {
            //         if (error.response) {
            //             dispatch(setUserError(error.response.data.msg.message ? error.response.data.msg.message :error.response.data.msg))
            //         }
            //         reject()
            //     });
        })

    }
}