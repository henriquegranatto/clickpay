'use strict'

// IMPORTANDO OS MÓDULOS NECESSÁRIO
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const {base64encode} = require('nodejs-base64')

// CRIANDO O APP
const app = express()

// CONECTANDO AO BANCO DE DADOS
mongoose.connect('mongodb://nodejs:node123@ds263161.mlab.com:63161/nodejs', { useNewUrlParser: true })
mongoose.set('useFindAndModify', false)

// CONFIGURANDO RESPONSES
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// IMPORTANDO OS MDDELS
const codeModel = require('./models/code-model')
const userModel = require('./models/user-model')
const blackListModel = require('./models/black-list-model')
const historyPointsModel = require('./models/history-points-model')
const historyPaymentModel = require('./models/history-payments-model')

// IMPORTANDO AS ROTAS
const indexRoute = require('./routes/index-route')
const UserRoute = require('./routes/user-route')
const AuthRoute = require('./routes/auth-route')
const PointsRoute = require('./routes/points-route')

// CONFIGURANDO AS ROTAS
app.use('/', indexRoute)
app.use('/user', UserRoute)
app.use('/auth', AuthRoute)
app.use('/points', PointsRoute)


// IMPORTANDO O MÓDULO 
module.exports = app