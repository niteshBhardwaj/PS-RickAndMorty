import fetch from 'node-fetch';

const fetchPost = function({url, body, params}) {
    return (fetch(url, {
        method: 'post',
        body:    JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
        ...params
    })
    .then(res => res.json()))
}


module.exports = {
    fetchPost
}