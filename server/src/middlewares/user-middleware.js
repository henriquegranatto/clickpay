'use strict'

// IMPORTANDO MÓDULOS NECESSÁRIOS
const mongoose = require('mongoose')
const User = mongoose.model('User')
const {base64encode} = require('nodejs-base64')
const auth = require('../middlewares/auth-middleware')

// CONFIGURANDO REGEX
const password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&[^`´"'\/|,.-<>:?]).{8,10}$/
const email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

// VALIDANDO OS DADOS PASSADOS POR REQUISIÇÃO
exports.validateUser = async (user) =>
{
    if (user.rate) return false
    if (!user.name) return false
    if (user.points) return false
    if (user.publicCode) return false
    if (user.isUsedCode) return false

    if(validateEmail(user.email) || validateName(user.name)) return false

    if(email.test(user.email) && password.test(user.password))
    {
        if (user.code) 
        {
            if(await validateCode(user.code)) return 'code'
            return 4002
        }

        return true
    }

    return false
}

// VALIDANDO OS DADOS PASSADOS POR REQUISIÇÃO
exports.validateEdit = async (user) =>
{
    if (!user.name) delete user.name; 
    if (!user.email) delete user.email; 
    if (!user.password) delete user.password; 

    if(validateEmail(user.email) || validateName(user.name)) return false

    if(user.email)
    {
        if(!email.test(user.email))
        {
            delete user.email;
        }
    }

    if(user.password)
    {
        if(!password.test(user.password))
        {
            delete user.password;
        }

        user.password = await auth.encodePassword(user.password)
    }

    return user
}

// VALIDANDO CÓDIGO DE REFERÊNCIA PASSADO POR REQUISIÇÃO
const validateCode = async (code) =>
{
    const result = await User.find({publicCode: code})
    if(result != "") return true
    return false
}

// CRIANDO O CÓDIGO PÚBLICO DO USUÁRIO
exports.createUserPublicCode = async () =>
{
    return base64encode(Date.now());
}

// VALIDA SE O E-MAIL EXISTE (INTERNA)
const validateEmail = async (email) =>
{
    const result = await User.find({email: email})
    if(result != "") return true
    return false
}

// VALIDA SE O NOME EXISTE (INTERNA)
const validateName = async (name) =>
{
    const result = await User.find({name: name})
    if(result != "") return true
    return false
}