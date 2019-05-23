'use strict'

// IMPORTANDO OS MÓDULOS NECESSÁRIOS;
const express = require('express')
const route = express.Router()
const controller = require('../controllers/points-controller')
const test = require('../middlewares/history-points-middleware')

// ROTAS RELACIONADAS AO GERENCIAMENTO DOS PONTOS
route.post('/credit', controller.creditPoints);
route.post('/creditByReferencial', controller.creditPointsByCode);
route.post('/testHistory', test.registerOnHistory);

// EXPORTANDO O MÓDULO
module.exports = route