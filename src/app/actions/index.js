var axios = require('axios');
axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.common['accesstoken'] =  ""

import moment from "moment"

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
                var userData = response.data
                localStorage.setItem("loginuser",JSON.stringify(userData));
                axios.defaults.headers.common['accesstoken'] = JSON.parse(localStorage.getItem("loginuser")) ? JSON.parse(localStorage.getItem('loginuser')).access_token :"";
                axios.post("api/userlog/",{
                    userId:userData.email
                }).then(function (logResponse,logErr) {
                    console.log("----login logerror----",logErr)
                    if(logResponse.data._id){
                        localStorage.setItem("logId",logResponse.data._id)
                        console.log("---- logId  ----",logResponse.data._id)
                        dispatch(setLoginPending(false));
                        dispatch(setLoginSuccess(true));
                    }else{
                        dispatch(setLoginPending(false));
                        dispatch(setLoginSuccess(false));
                    }
                })
            })
            .catch(function (error) {
                if (error.response) {
                    dispatch(setLoginPending(false));
                    dispatch(setLoginError(error.response.data.msg))
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error Message from ', error.message);
                }
            });
    }
}
export function postSignOutUserLog(logId) {
    return dispatch => {
        axios.put('/api/userlog',{logId:logId}).then(function (response,err) {
            if(response){
                console.log("----sucess ra bhai----")
            }
        })
    }

}

export function getUsers() {
    return  dispatch => {
        axios.get('/api/users')
            .then(function(response) {
                dispatch(setUsersData(response.data))
            });
    }
}
export function setCount(count) {
    return {
        type: "SET_COUNT_DATA",
        payload:count
    };
}
export function getRoles() {
    return  dispatch => {
        axios.get('/api/users/roles')
            .then(function(response) {
                dispatch(setRoles(response.data))
            });
    }
}
export function getTasks() {
    return  dispatch => {
        axios.get('/api/tasks')
            .then(function(response) {
                dispatch(setTask(response.data))
            });
    }
}

export function setUsersData(usersData) {

    return {
        type: "SET_USERS_DATA",
        payload:usersData
    }
}
export function setEventData(data) {

    return {
        type: "SET_EVENT_DATA",
        payload:data
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
        type: "SET_TASKS_DATA",
        payload:task
    }
}
export function setRoles(roles) {

    return {
        type: "SET_ROLES_DATA",
        payload:roles
    }
}
export function setHeaders(token) {
    return  dispatch => {
        axios.defaults.headers.common['accesstoken'] = token
    }

}
export function setPermissions(permissions) {
    return {
        type: "SET_PERMISSIONS",
        payload:permissions
    }
}
export function setSelectedDateData(data) {
    return {
        type: "SET_SELECTED_DATE_DATA",
        payload:data
    }
}
export function setSelectedDate(date) {
    return {
        type: "SET_SELECTED_DATE",
        payload:date
    }
}
export function clearSelectedDateData() {
    return {
        type: "CLEAR_SELECTED_DATE_DATA"
    }
}


export function setModalStatus(status) {

    return {
        type: "SET_MODAL_STATUS",
        payload:status
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
            axios.post('/api/users', {
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

export function editUser(user) {
    return  dispatch => {
        return new Promise (function (resolve,reject) {
            axios.put('/api/users', {
                email: user.email,
                role: user.role,
                name: user.name,
                isActive:user.isActive
            })
                .then(function (response,err) {
                    dispatch(getUserDetails(user.email))
                    dispatch(clearUserData(true))
                    dispatch(setUserError(""));
                    dispatch(setModalStatus(false));
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
            axios.post('/api/tasks', {
                title:task.title,
                description:task.description,
                startDate:task.startDate,
                endDate:task.endDate,
                assignTo:task.assignTo
            })
                .then(function (response,err) {
                    console.log("----api hitting----",response,err)
                    dispatch(getTasks());
                    dispatch(setTaskError(""));
                    resolve()
                })
                .catch(function (error) {
                    if (error.response) {
                        dispatch(setTaskError(error.response.data.msg.message ? error.response.data.msg.message :error.response.data.msg))
                    }
                    reject()
                });
        })

    }
}
export function editTask(task) {
    return  dispatch => {
        return new Promise (function (resolve,reject) {
            axios.put('/api/tasks', {
                taskId:task.taskId,
                title:task.title,
                description:task.description,
                startDate:task.startDate,
                endDate:task.endDate,
                assignTo:task.assignTo
            })
                .then(function (response,err) {
                    console.log("----api hitting----",response,err)
                    dispatch(getTasks());
                    dispatch(getUserTasks(task.userId));
                    dispatch(setTaskError(""));
                    resolve()
                })
                .catch(function (error) {
                    if (error.response) {
                        dispatch(setTaskError(error.response.data.msg.message ? error.response.data.msg.message :error.response.data.msg))
                    }
                    reject()
                });
        })

    }
}
export function selectedUserData(selectedUserData) {

    return {
        type: "SELECTED_USER_DATA",
        payload:selectedUserData
    }
}
export function selectedUserLog(selectedUserLog) {

    return {
        type: "SELECTED_USER_LOG",
        payload:selectedUserLog
    }
}
export function selectedTaskData(selectedTaskData) {
    console.log("-----hello how are you----",selectedTaskData)

    return {
        type: "SELECTED_TASK_DATA",
        payload:selectedTaskData
    }
}
export function setUserTasks(userTasks) {

    return {
        type: "SET_USER_TASKS",
        payload:userTasks
    }
}
export function getUserTasks(email) {

    console.log("-----email from getUserTasks-----",email)

    return  dispatch => {
        var userTasks = "/api/tasks/"+email;
        axios.get(userTasks)
            .then(function(response) {
                dispatch(setUserTasks(response.data))
            });
    }
}
export function getUserDetails(email) {
    return  dispatch => {
        var userDetails = "/api/users"+"/"+email;
        axios.get(userDetails).then(function(response) {
                dispatch(selectedUserData(response.data))
            });
    }
}
export function getUserLog(email) {
    return  dispatch => {
        var userLog = "/api/userlog"+"/"+email;
        axios.get(userLog).then(function(response) {
                dispatch(selectedUserLog(response.data))
            });
    }
}
export function getEventData(month,year) {
    return  dispatch => {
        var userMonthlydataUrl = "api/users/month/time?month="+month+"&year="+year;
        axios.get(userMonthlydataUrl).then(function(response) {
                dispatch(setEventData(response.data))
            });
    }
}
export function getSelectedDateData(date) {
    return  dispatch => {
        var userMonthlydataUrl = "api/users/date/time?date="+date
        axios.get(userMonthlydataUrl).then(function(response) {
                dispatch(setSelectedDateData(response.data))
            });
    }
}
export function addTime(data,date) {
    return  dispatch => {

        axios.post('api/users/date/time', {
                date:date,
                hours:data.hours,
                mins:data.mins,
                project:data.project,
                description:data.description
            })
                .then(function (response,err) {
                    dispatch(getEventData(moment(date).month()+1,moment(date).year()));
                    dispatch(getSelectedDateData(date))
                })

    }
}
