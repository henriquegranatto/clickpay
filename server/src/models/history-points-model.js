'use strict'

// IMPORTANDO OS MÓDULOS NECESSÁRIOS
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// CRIANDO O ESQUEMA DOS REGISTROS DE HISTÓRICO DE PONTOS A SEREM SALVOS NA COLEÇÃO
const historyPoints = new Schema({
    publicCode: 
    {
        type: 'String',
        required: true,
    },

    datePayment:
    {
        type: 'Date',
        required: true,
        default: Date.now(),
    },

    value:
    {
        type:  'Number',
        required: true,
    },

    referencialCode:
    {
        type: 'String',
        default: "",
        required: false,
    },

    authentication:
    {
        type: 'String',
        required: true,
    }
});

// EXPORTANDO O ESQUEMA
module.exports = mongoose.model('HistoryPoints', historyPoints)