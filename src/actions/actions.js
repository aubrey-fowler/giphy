import 'whatwg-fetch';

import {  
  SET_PAGE_NUMBER, 
  SET_SEARCH_FILTER,
  //REQUEST_GIFS,
  RECIEVE_GIFS 
} from './actionTypes'; 

export function setPageNumber(pageNumber) {  
    return {
        type: SET_PAGE_NUMBER,
        pageNumber
    };
}

export function setSearchFilter(filter) {  
    return {
        type: SET_SEARCH_FILTER,
        filter
    };
}

export function receiveGifs(idList) {
  return {
    type: RECIEVE_GIFS,
    idList
  }
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

function parseJSON(response) {
    return response.json();
}

function getIdList(data) {
    let idList = [];

    for (var i = 0; i < data.data.length; i++) {
        idList.push(data.data[i].id);
    }

    return idList;
}

export function requestGifs(searchFilter, limit, offset) {
  return dispatch => {
    return fetch(`http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=${searchFilter}&limit=${limit}&offset=${offset}`)
        .then(checkStatus)
        .then(parseJSON)
        .then(function(data) {
            console.log('request succeeded with JSON response', data);
            return getIdList(data);
        })
        .then(idList => dispatch(receiveGifs(idList)))
        .catch(function(error) {
            console.log('request failed', error);
        });
  }
}
