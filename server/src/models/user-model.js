'use strict'

// IMPORTANDO OS MÓDULOS NECESSÁRIOS
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// CRIANDO O ESQUEMA DOS REGISTROS DE USUÁRIOS A SEREM SALVOS NA COLEÇÃO
const user = new Schema({
    name:
    {
        type: 'String',
        required: true,
    },

    email:
    {
        type: 'String',
        required: true,
    },

    password:
    {
        type: 'String',
        // select: false,
        required: true,
    },

    points:
    {
        type: 'Number',
        default: 0,
        required: true,
    },

    rate:
    {
        type: 'Number',
        default: 30,
        required: true,
    },

    isUsedReferencialCode:
    {
        type: 'Boolean',
        default: false,
        required: true,
    },

    referencialCode:
    {
        type: 'String',
        default: "",
        required: false,
    },

    publicCode: 
    {
        type: 'String',
        required: true,
    },

    jwt:
    {
        type: 'String',
        default: ""
    }
});

// EXPORTANDO O ESQUEMA
module.exports = mongoose.model('User', user)