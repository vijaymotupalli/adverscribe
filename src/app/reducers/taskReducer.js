const userReducer = (state = {
    tasks: [],error:"",taskDataClear:false
}, action) => {
    switch (action.type) {
        case "SET_TASK":
           state.tasks.push(action.payload);
            break;
        case "SET_TASK_ERROR":
            state = {
                ...state,
                error: action.payload
            };
            break;
        case "CLEAR_TASK_DATA":
        state = {
            ...state,
            taskDataClear: action.payload
        };
        break;
    }
    return state;
};

export default userReducer;