import { 
    SET_PAGE_NUMBER, 
    SET_SEARCH_FILTER,
    RECIEVE_GIFS 
} from '../actions/actionTypes';

const initialState = {
    currentPage: 0,
    currentSearchFilter: 'Puppies',
    data: {
        'Puppies' : {
            '0' : [
                'l0HlRNXAPC0FBlKUM',
                'l41m0CPz6UCnaUmxG',
                'kwAi4WrChkSfm',
                '3oz8xXS6gDYSNbqme4',
                'l0ExvA6hnrdzQ5zoI'
            ],
            '1': [
                'immFYe2gQStuU',
                'QyaBgFR1Nkz5K',
                'yXBqba0Zx8S4',
                '26ybuMMAak2OrTaaQ',
                '12wYJwhnA5CYda'
            ]
        },
        'Kittens' : {
            '0' : [
                'yFQ0ywscgobJK',
                'KKKR0ZwHAzUsg',
                'vAHZ9rc8rY8zm',
                'Ol2yHMEFJdYEo',
                'xT8qBt2943MLRO8zuM'
            ],
            '1': [
                '5kjsIIc47PKRq',
                'emWySpOLFLUAM',
                '3oriO0OEd9QIDdllqo',
                'TPXDdboFckd9u',
                'p6DsF6TrStko8'
            ]
        }
    }
};

export function setPageNumber(state, action) {
    console.log('setPageNumber: ', action.pageNumber);

    const pageNumber = action.pageNumber;

    if (!state.data[state.currentSearchFilter].hasOwnProperty(pageNumber.toString())) {
        console.log('new page being requested');
    }

    return Object.assign({}, state, {
        currentPage: pageNumber
    });
}

export function setSearchFilter(state, action) {
    console.log('setSearchFilter: ', action.filter);
    return Object.assign({}, state, {
        currentSearchFilter: action.filter
    })
}

export function requestInitialData(state, action) {
    console.log('requestInitialData', action.idList);
    return state;
}

export function appReducer(state = initialState, action) {
    switch(action.type) {
        case RECIEVE_GIFS: return requestInitialData(state, action);
        case SET_PAGE_NUMBER : return setPageNumber(state, action);
        case SET_SEARCH_FILTER : return setSearchFilter(state, action);
        default : return state;
    }
}