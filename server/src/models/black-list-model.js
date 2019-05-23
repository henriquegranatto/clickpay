'use strict'

// IMPORTANDO OS MÓDULOS NECESSÁRIOS
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// CRIANDO O ESQUEMA DOS REGISTROS DE BLACKLIST A SEREM SALVOS NA COLEÇÃO
const blackList = new Schema({
    type:
    {
        type: 'String',
        required: true,
    },

    data:
    {
        type: 'String',
        required: true,
    }
});

// EXPORTANDO O ESQUEMA
module.exports = mongoose.model('BlackList', blackList)