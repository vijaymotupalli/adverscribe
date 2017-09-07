const eventReducer = (state = {
    events:[],selectedDateData:[],count:[],selectedDate:""
}, action) => {
    switch (action.type) {
        case "SET_COUNT_DATA":
            if(action.payload){
                state = {
                    ...state,
                    count:[...state.count,action.payload]
                };
                break;
            }else{
                state = {
                    ...state,
                    count:[ ]
                };
                break;
            }
        case "SET_SELECTED_DATE_DATA":

            state = {
                ...state,
                selectedDateData:state.selectedDateData.concat(action.payload)

            };
            break;
        case "SET_SELECTED_DATE":

            state = {
                ...state,
                selectedDate:action.payload

            };
            break;
        case "CLEAR_SELECTED_DATE_DATA":

            state = {
                ...state,
                selectedDateData:[]

            };
            break;
        case "SET_EVENT_DATA":
            state = {
                ...state,
                events:action.payload
            };
            break;
    }
    return state;
};

export default eventReducer;