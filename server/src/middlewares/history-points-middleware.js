'use strict'

// IMPORTANDO MÓDULOS NECESSÁRIOS
const mongoose = require('mongoose')
const {base64encode} = require('nodejs-base64')
const HistoryPoints = mongoose.model('HistoryPoints')

// REGISTRANDO O HISTÓRICO DOS PONTOS CREDITADOS
exports.registerOnHistory = async (request) =>
{
    try
    {
        const referencialCode = validateReferencialCode(request.referencialCode)
        const data = createHistoryData(request.publicCode, request.points, referencialCode)
        const record = new HistoryPoints(data)

        try
        {
            if(await record.save())
            {
                return true
            }
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

// VALIDANDO O CÓDIGO DE REFERÊNCIA INFORMADO (INTERNA)
const validateReferencialCode = (code) =>
{
    let referencialCode = "";

    code ? referencialCode = code : false

    return referencialCode
}

// CRIANDO O MODELO DE REGISTRO DE HISTÓRICO (INTERNA)
const createHistoryData = (publicCode, points, referencialCode) =>
{
    const record = 
    {
        publicCode: publicCode,
        value: points,
        referencialCode: referencialCode,
        authentication: base64encode(JSON.stringify({publicCode: publicCode, datePayment: Date.now(), value: points,})),
    }

    return record
}