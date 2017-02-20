// fetch polyfill for IE and Safari support
import 'whatwg-fetch';

import {  
    SET_PAGE_NUMBER, 
    SET_SEARCH_FILTER,
    RECIEVE_GIFS,
    RECIEVE_GIFS_FOR_PAGE,
    RECIEVE_GIFS_FOR_FILTER,
    SET_MODAL_VISIBILITY 
} from './actionTypes'; 

import { checkStatus, parseJSON, getIdList, getResults } from './actionUtils';

export function updatePageNumber(pageNumber) {  
    return {
        type: SET_PAGE_NUMBER,
        pageNumber
    };
}

export function setModalVisibility(id) {
    return {
        type: SET_MODAL_VISIBILITY,
        id
    };
}

function shouldFetchGifsForPageNumber(state, pageNumber) {
    const gifs = state.data[state.currentSearchFilter][pageNumber.toString()];
    return !gifs;
}

function shouldFetchGifsForFilter(state, filter) {
    const gifs = state.data[filter][state.currentPageNumber];
    return !gifs;
}

// don't fetch gifs from server if the page already has the data
export function setPageNumber(pageNumber) {
    return (dispatch, getState) => {
        if (shouldFetchGifsForPageNumber(getState(), pageNumber)) {
            return dispatch(requestGifsForPage(getState()['currentSearchFilter'], pageNumber));
        } else {
            return dispatch(updatePageNumber(pageNumber));
        }
    }
}

// don't fetch gifs from server if the filter on current page already has the data
export function setSearchFilter(filter) {
    return (dispatch, getState) => {
        if (shouldFetchGifsForFilter(getState(), filter)) {
            return dispatch(requestGifsForFilter(filter, getState()['currentSearchFilter']));
        } else {
            return dispatch(updateSearchFilter(filter));
        }
    }
}

export function updateSearchFilter(idList, filter) {  
    return {
        type: SET_SEARCH_FILTER,
        filter
    };
}

export function receiveGifs(idList, searchFilter, totalNumSearchResults) {
    return {
        type: RECIEVE_GIFS,
        idList,
        searchFilter,
        totalNumSearchResults
    }
}

export function receiveGifsForPage(idList, pageNumber) {
    return {
        type: RECIEVE_GIFS_FOR_PAGE,
        idList,
        pageNumber
    }
}

export function receiveGifsForFilter(idList, filter) {
    return {
        type: RECIEVE_GIFS_FOR_FILTER,
        idList,
        filter
    };
}

export function requestGifs(searchFilter, limit, offset) {
    return dispatch => {
        return fetch(`http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=${searchFilter}&limit=${limit}&offset=${offset}`)
            .then(checkStatus)
            .then(parseJSON)
            .then(getResults)
            .then(result => dispatch(receiveGifs(result.idList, searchFilter, result.total)))
            .catch(error => console.log('request failed', error));
    }
}

export function requestGifsForPage(searchFilter, pageNumber) {
    var offset = pageNumber * 15;
    return dispatch => {
        return fetch(`http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=${searchFilter}&limit=15&offset=${offset}`)
            .then(checkStatus)
            .then(parseJSON)
            .then(getIdList)
            .then(idList => dispatch(receiveGifsForPage(idList, pageNumber)))
            .catch(error => console.log('request failed', error));  
    } 
}

export function requestGifsForFilter(searchFilter, pageNumber) {
    var offset = pageNumber * 15;
    return dispatch => {
        return fetch(`http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=${searchFilter}&limit=15&offset=${offset}`)
            .then(checkStatus)
            .then(parseJSON)
            .then(getIdList)
            .then(idList => dispatch(receiveGifsForFilter(idList, searchFilter)))
            .catch(error => console.log('request failed', error));  
    } 
}