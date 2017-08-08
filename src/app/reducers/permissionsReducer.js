const permissionReducer = (state = {
    permissions :""
}, action) => {
    switch (action.type) {
        case "SET_PERMISSIONS":
            state = {
                ...state,
                permissions: action.payload
            };
            break;
    }
    return state;
};

export default permissionReducer;