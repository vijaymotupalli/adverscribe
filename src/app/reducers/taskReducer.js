const userReducer = (state = {
    tasks: "",error:"",taskDataClear:false,selectedTask:""
}, action) => {
    switch (action.type) {
        case "SET_TASKS_DATA":
            state = {
                ...state,
                tasks: action.payload
            };
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
        case "SELECTED_TASK_DATA":
        state = {
            ...state,
            selectedTask: action.payload
        };
        break;
    }
    return state;
};

export default userReducer;