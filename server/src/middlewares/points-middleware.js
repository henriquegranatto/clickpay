'use strict'

// IMPORTANDO MÓDULOS NECESSÁRIOS
const mongoose = require('mongoose')
const Code = mongoose.model('Code')
const User = mongoose.model('User')
const history = require('../middlewares/history-points-middleware')

// VALIDANDO O CÓDIGO DE REFERÊNCIA INFORMADO
exports.validateCode = async (code, publicCode) =>
{
    const result = await Code.find({publicCode: code})
    const resultUser = await User.find({publicCode: publicCode})
    
    if(result.length > 0)
    {
        if(result[0].expireIn >= Date.now() && result[0].amountOfUse > result[0].alreadyUsed || result[0].expireIn >= Date.now() && result[0].amountOfUse == 0)
        {
            if(resultUser[0].isUsedReferencialCode == false)
            {
                return true
            }
        }

        return false
    }
}

// REALIZANDO O CRÉDITO DOS PONTOS
exports.creditPoints = async (request) =>
{
    try
    {
        const data = await User.find({publicCode: request.body.publicCode})
        
        const points = data[0].points + 1

        try 
        {
            await User.findOneAndUpdate({publicCode: request.body.publicCode}, {points: points})
            await history.registerOnHistory({publicCode: request.body.publicCode, points: points, referencialCode: ""})
            return true
        }
        catch(e)
        {
            return {message: e}
        }
    }
    catch(e)
    {
        return {message: e}
    }
}

// REALIZANDO O CRÉDITO DOS PONTOS POR REFERENCIAL
exports.creditByReferencial = async (request) =>
{
    try
    {
        const dataCode = await Code.find({publicCode: request.body.referencial}) 
                    
        const dataUser = await User.find({publicCode: request.body.publicCode})
        
        const points = dataCode[0].points + dataUser[0].points

        if(dataCode[0].amountOfFreeRate > dataCode[0].amountOfFreeRatealreadyUsed || dataCode[0].amountOfFreeRate == 0)
        {
            try
            {
                await User.findOneAndUpdate({publicCode: request.body.publicCode}, {referencialCode: request.body.referencial, points: points, rate: dataCode[0].rate})
                await history.registerOnHistory({publicCode: request.body.publicCode, points: points, referencialCode: request.body.referencial})            
                return true
            }
            catch(e)
            {
                return{message: e}
            }
        }
        else
        {
            try
            {
                await User.findOneAndUpdate({publicCode: request.body.publicCode}, {referencialCode: request.body.referencial, points: points})
                await history.registerOnHistory({publicCode: request.body.publicCode, points: points, referencialCode: request.body.referencial})            
                return true
            }
            catch(e)
            {
                return {message: 'Houve um problema'}
            }
        }
    }
    catch(e)
    {
        return {message: e}
    }
}