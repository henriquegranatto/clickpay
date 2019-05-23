'use strict'

// IMPORTANDO OS MÓDULOS NECESSÁRIOS
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// CRIANDO O ESQUEMA DOS REGISTROS DE HISTÓRICO DE PAGAMENTOS A SEREM SALVOS NA COLEÇÃO
const historyPayments = new Schema({
    publicCode: 
    {
        type: 'String',
        required: true,
    },

    datePayment:
    {
        type: 'Date',
        required: true,
    },

    value:
    {
        type:  'Number',
        required: true,
    },

    email:
    {
        type: 'String',
        required: true,
    },

    authentication:
    {
        type: 'Number',
        required: true,
    }
});

// EXPORTANDO O ESQUEMA
module.exports = mongoose.model('HistoryPayments', historyPayments)