const userReducer = (state = {
    users: "",error:"",userDataClear:false
}, action) => {
    switch (action.type) {
        case "SET_USERS_DATA":
            state = {
                ...state,
                users: action.payload
            };
            break;
        case "SET_USER_ERROR":
            state = {
                ...state,
                error: action.payload
            };
            break;
        case "CLEAR_USER_DATA":
        state = {
            ...state,
            userDataClear: action.payload
        };
        break;
    }
    return state;
};

export default userReducer;