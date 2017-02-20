export function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

export function parseJSON(response) {
    return response.json();
}

export function getIdList(data) {
    let idList = [];

    for (var i = 0; i < data.data.length; i++) {
        idList.push(data.data[i].id);
    }

    return idList;
}

export function getResults(data) {
    const result = {
        idList: getIdList(data),
        total: data.pagination.total_count
    };
    return result;
}