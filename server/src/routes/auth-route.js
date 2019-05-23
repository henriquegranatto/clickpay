'use strict'

// IMPORTANDO OS MÓDULOS NECESSÁRIOS;
const express = require('express')
const route = express.Router()
const controller = require('../controllers/auth-controller')

// ROTA QUE GERENCIA O ACESSO A API PELAS AUTENTICAÇÕES
route.post('/login', controller.loginUser)
route.post('/password', controller.redefineUserPassword)

// EXPORTANDO O MÓDULO
module.exports = route