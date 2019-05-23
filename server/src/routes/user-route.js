'use strict'

// IMPORTANDO OS MÓDULOS NECESSÁRIOS;
const express = require('express')
const route = express.Router()
const controller = require('../controllers/user-controller')

// ROTAS RELACIONADAS AOS USUÁRIOS
route.post('/edit', controller.putUser)
route.post('/create', controller.postUser)
route.post('/index', controller.getUserIndex)
route.post('/accouunt', controller.getUserAccouunt)


route.get('/', controller.getUser)
route.delete('/', controller.deleteUser)

// EXPORTANDO O MÓDULO
module.exports = route