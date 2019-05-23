'use strict'

// IMPORTANDO MÓDULOS NECESSÁRIOS
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = mongoose.model('User')

// BUSCANDO USUÁRIO POR EMAIL E SENHA (INTERNA)
const findUser = async (email) =>
{
    let result = "";

    try
    {
        const data = await User.find({email: email});

        if(data.length > 0)
        {
            return result = {publicCode: data[0].publicCode, password: data[0].password};
        }

        return false
    }
    catch(e)
    {
        console.log(e);
    }

    return result;
}

// CRIANDO A CHAVE PRIVADA DO TOKEN
exports.createToken = async (data) =>
{
   return await jwt.sign({ publicCode: data, date: Date.now() }, 'iH;n+g$&R59g3&7A:#Lw');
}

// ATUALIZANDO O TOKEN ATUAL DO USUÁRIO
exports.updateToken = async (data, token) =>
{
    try
    {
        const result = await User.findOneAndUpdate({publicCode: data}, { jwt: token });

        if(result)
        {
            return true;
        }

        return false;
    }
    catch(e)
    {
        console.log(e);
    }
}

// BUSCANDO USUÁRIO POR EMAIL E SENHA
exports.findUser = async (email) =>
{
    let result = "";

    try
    {
        const data = await User.find({email: email});

        if(data.length > 0)
        {
            return result = {publicCode: data[0].publicCode, password: data[0].password};
        }

        return false
    }
    catch(e)
    {
        console.log(e);
    }

    return result;
}

// VALIDANDO TOKEN ENVIADO
exports.validateToken = async (publicCode, token) =>
{
    try
    {
        const {publicCode} = await jwt.verify(token, 'iH;n+g$&R59g3&7A:#Lw');
        const result = await User.find({publicCode: publicCode});

        if(result)
        {
            if(result[0].publicCode == publicCode && result[0].jwt == token)
            {
                return true   
            }
            else
            {
                return false
            }
        }
    }
    catch(e)
    {
        return false;
    }    
}

// ENCRIPTANDO A SENHA
exports.encodePassword = async (password) =>
{
    return await bcrypt.hash(password, 10)
}

// VALIDANDO A SENHA INFORMADA PELO USUÁRIO
exports.decodePassword = async (email, password) =>
{
    const data = await findUser(email);
    return await bcrypt.compare(password, data.password);
}