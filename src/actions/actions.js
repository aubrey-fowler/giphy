// fetch polyfill for IE and Safari support
import 'whatwg-fetch';

import {  
    SET_PAGE_NUMBER, 
    SET_SEARCH_FILTER,
    RECIEVE_GIFS,
    RECIEVE_GIFS_FOR_PAGE 
} from './actionTypes'; 

import { checkStatus, parseJSON, getIdList } from './actionUtils';

export function updatePageNumber(pageNumber) {  
    return {
        type: SET_PAGE_NUMBER,
        pageNumber
    };
}

function shouldFetchGifs(state, pageNumber) {
    const gifs = state.data[state.currentSearchFilter][pageNumber.toString()];
    return !gifs;
}

// don't fetch gifs from server if the page already has the data
export function setPageNumber(pageNumber) {
    return (dispatch, getState) => {
        if (shouldFetchGifs(getState(), pageNumber)) {
            return dispatch(requestGifsForPage(getState().get('currentSearchFilter'), pageNumber));
        } else {
            return dispatch(updatePageNumber(pageNumber));
        }
    }
}

export function setSearchFilter(filter) {  
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

function getResults(data) {
    const result = {
        idList: getIdList(data),
        total: data.pagination.total_count
    };
    return result;
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