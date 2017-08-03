const userReducer = (state = {
    users: "",error:""
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
    }
    return state;
};

export default userReducer;