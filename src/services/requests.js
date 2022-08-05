async function request(method, endpoint, body) {
    const url = 'http://localhost:5500' + endpoint;
    const headers = {
        'Access-Control-Allow-Origin': true,
        'Access-Control-Allow-Credentials': true,
    };
    
    const request = {
        method,
        credentials: 'include',
        headers,
    };

    if (body) {
        headers['Content-Type'] = 'application/json';
        request.body = JSON.stringify(body);
    }

    const res = await fetch(url, request);

    let data;

    try {
        data = await res.json();
    } catch (err) {
        data = [];
    }

    return { res, data };
}

const get = request.bind(null, 'GET');
const post = request.bind(null, 'POST');
const put = request.bind(null, 'PUT');
const del = request.bind(null, 'DELETE');

const requestService = {
    get,
    post,
    put,
    del
};

export default requestService;