const eventReducer = (state = {
    Events:[
        {
            start: '2017-09-2',
            end: '2017-09-2',
            eventClasses: 'optionalEvent',
            title: '8hr',
            hours:'10hr',
            description: 'This is a test description of an event',
        }

    ],selectedDateData:[{
        hours:3,
        mins:20,
        projects:"Adverscribe",
        description:"testing"
    }],count:[]
}, action) => {
    switch (action.type) {
        case "SET_EVENT_DATA":
            state = {
                ...state,
                Events:state.Events.push(action.payload)
            };
            break;
        case "SET_COUNT_DATA":
            var newCount = state.count
            newCount.push(action.payload)
            state = {
                ...state,
                count:newCount
            };
            break;
    }
    return state;
};

export default eventReducer;