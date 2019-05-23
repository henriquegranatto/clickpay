'use strict'

// IMPORTANDO OS MÓDULOS NECESSÁRIOS
const axios = require('axios');

exports.publicCode = ""
exports. token = ""

const response = (url, data) =>
{
    return axios
    .post(url, data)
    .then((response) => {
        return response.data
    })
    .catch((e) => 
    {
        return e
    })
}

exports.send = async (request) =>
{
    switch(request.type)
    {
        case 'user-login':
            return response('http://192.168.15.4:80/auth/login', request.data);
        break;

        case 'user-index':
            return response('http://192.168.15.4:80/user/index', request.data)
        break;
    }
}