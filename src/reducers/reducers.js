import { 
    SET_PAGE_NUMBER, 
    SET_SEARCH_FILTER,
    RECIEVE_GIFS,
    RECIEVE_GIFS_FOR_PAGE 
} from '../actions/actionTypes';

const initialState = {
    currentPage: 0,
    currentSearchFilter: 'Puppies',

    // ,
    // resultsPerSearchFilter: {
    //     'Puppies': 0,
    //     'Kittens': 0
    // },

    data: {
        'Puppies': {
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
        'Kittens': {
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

function setPageNumber(state, action) {
    return Object.assign({}, state, {
        currentPage: action.pageNumber
    });
}

function setSearchFilter(state, action) {
    return Object.assign({}, state, {
        currentSearchFilter: action.filter
    });
}

function requestInitialData(state, action) {
    const searchFilter = action.searchFilter;

    var pageData = {};
    var groupedArray = createGroupedArray(action.idList, 15);
    for (var i = 0; i < groupedArray.length; i++) {
        pageData[i.toString()] = groupedArray[i];
    }

    var dataCopy = state.data;
    dataCopy[searchFilter] = pageData;

    return Object.assign({}, state, {
        data: dataCopy
    });
}

function createGroupedArray(arr, chunkSize) {
    var groups = [];
    for (var i = 0; i < arr.length; i += chunkSize) {
        groups.push(arr.slice(i, i + chunkSize));
    }
    return groups;
}

function setGifsForPage(state, action) {
    var dataCopy = state.data;
    dataCopy[state.currentSearchFilter][action.pageNumber.toString()] = action.idList;

    return Object.assign({}, state, {
        data: dataCopy
    });
}

export function appReducer(state = initialState, action) {
    switch(action.type) {
        case RECIEVE_GIFS: return requestInitialData(state, action);
        case RECIEVE_GIFS_FOR_PAGE: return setGifsForPage(state, action);
        case SET_PAGE_NUMBER : return setPageNumber(state, action);
        case SET_SEARCH_FILTER : return setSearchFilter(state, action);
        default : return state;
    }
}