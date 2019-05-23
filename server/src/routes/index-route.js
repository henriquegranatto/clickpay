'use strict'

// EXPORTA O MÓDULO
const express = require('express')
const route = express.Router()

// ROTA TESTE PARA CONEXÃO COM A API
route.get('/', (request, response, next) => {
    response.status(200).send({
        title: 'Click Pay API',
        version: '1.0.0'
    })
});

// EXPORTANDO O MÓDULO
module.exports = route