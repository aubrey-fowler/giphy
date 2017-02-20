import { 
    SET_PAGE_NUMBER, 
    SET_SEARCH_FILTER,
    RECIEVE_GIFS,
    RECIEVE_GIFS_FOR_PAGE,
    RECIEVE_GIFS_FOR_FILTER,
    SET_MODAL_VISIBILITY 
} from '../actions/actionTypes';

const initialState = {
    currentPage: 0,
    currentSearchFilter: 'Puppies',
    isModalVisible: false,
    modalVideoId: null,
    resultsPerSearchFilter: {
        'Puppies': 0,
        'Kittens': 0
    },
    data: {
        'Puppies': {},
        'Kittens': {}
    }
};

function setPageNumber(state, action) {
    return Object.assign({}, state, {
        currentPage: action.pageNumber
    });
}

function setModalVisibility(state, action) {
    return Object.assign({}, state, {
        isModalVisible: !state.isModalVisible,
        modalVideoId: action.id === undefined ? null : action.id
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

    var numResultsCopy = state.resultsPerSearchFilter;
    numResultsCopy[searchFilter] = action.totalNumSearchResults;

    return Object.assign({}, state, {
        data: dataCopy,
        resultsPerSearchFilter: numResultsCopy
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
        data: dataCopy,
        currentPage: action.pageNumber
    });
}

function setGifsForFilter(state, action) {
    var dataCopy = state.data;
    dataCopy[action.filter][state.currentPage.toString()] = action.idList;

    return Object.assign({}, state, {
        data: dataCopy,
        currentSearchFilter: action.filter
    });
}

export function appReducer(state = initialState, action) {
    switch(action.type) {
        case RECIEVE_GIFS: return requestInitialData(state, action);
        case RECIEVE_GIFS_FOR_PAGE: return setGifsForPage(state, action);
        case RECIEVE_GIFS_FOR_FILTER: return setGifsForFilter(state, action);
        case SET_PAGE_NUMBER: return setPageNumber(state, action);
        case SET_SEARCH_FILTER: return setSearchFilter(state, action);
        case SET_MODAL_VISIBILITY: return setModalVisibility(state, action);
        default : return state;
    }
}