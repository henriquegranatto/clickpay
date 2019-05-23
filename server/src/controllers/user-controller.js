'use strict'

// IMPORTA OS MÓDULOS NECESSÁRIOS
const mongoose = require('mongoose')
const Code = mongoose.model('Code')
const User = mongoose.model('User')
const HistoryPoints = mongoose.model('HistoryPoints')
const user = require('../middlewares/user-middleware')
const auth = require('../middlewares/auth-middleware')
const points = require('../middlewares/points-middleware')

// CADASTRO DE USUÁRIOS
exports.postUser = async (request, response) =>
{
    try
    {
        const teste = user.validateUser(request.body)
        
        if(teste)
        {
            request.body.publicCode = await user.createUserPublicCode()
            const publicCode = {"publicCode": request.body.publicCode}

            request.body.password =  await auth.encodePassword(request.body.password)

            try
            {
                const code = new Code(publicCode)
                let message = ""
                
                if(request.body.referencialCode)
                {
                    if(await points.validateCode(request.body.referencialCode))
                    {
                        const data = await Code.find({publicCode: request.body.referencialCode})     
                        
                        request.body.points = data[0].points
                        request.body.rate = data[0].rate
                        request.body.isUsedReferencialCode = true
                        message = 2001
                    }
                    else
                    {
                        message = "Referencial code invalid"
                    }
                }

                const user = new User(request.body);
                
                if(await user.save() && await code.save())
                {
                    response.status(200).send({message: message});
                }
            }
            catch(e)
            {
                response.status(400).send({status: 4000, message: e});
            }
        }
        else if(teste == 4002)
        {
            response.status(400).send({message: 4002});
        }
        else
        {
            response.status(400).send({message: 4001});
        }
    }
    catch(e)
    {
        response.status(400).send({message: e});        
    }
}

// ATUALIZAÇÃO DE USUÁRIOS
exports.putUser = async (request, response) =>
{
    try
    {
        const campos = await user.validateEdit(request.body)
        const token = await auth.validateToken(request.body.publicCode, request.body.token)
        
        if(campos && token)
        {
            try
            {
                if(await User.findOneAndUpdate({publicCode: request.body.publicCode}, campos))
                {
                    response.status(200).send({message: 2001});
                }
            }
            catch(e)
            {
                response.status(400).send({status: 4000, message: e});
            }
        }
        else if(teste == 4002)
        {
            response.status(400).send({message: 4002});
        }
        else
        {
            response.status(400).send({message: 4001});
        }
    }
    catch(e)
    {
        response.status(400).send({message: e});        
    }
}

// BUSCA AS INFORMAÇÕES DA VIEW HOME
exports.getUserIndex = async (request, response) =>
{
    try
    {
        if(await auth.validateToken(request.body.publicCode, request.body.token))
        {
            const user = await User.find({publicCode: request.body.publicCode});
            response.status(200).send({name: user[0].name, points: user[0].points});
        }
        else
        {
            response.status(400).send({message: 'token invalid'})
        }
    }
    catch(e)
    {
        response.status(400).send({message: e})
    }
}

// BUSCA AS INFORMAÇÕES DA VIEW ACCOUNT
exports.getUserAccouunt = async (request, response) =>
{
    try
    {
        if(await auth.validateToken(request.body.publicCode, request.body.token))
        {
            const user = await User.find({publicCode: request.body.publicCode});
            response.status(200).send({name: user[0].name, points: user[0].points, points: user[0].points, email: user[0].email});
        }
        else
        {
            response.status(400).send({message: 'token invalid'})
        }
    }
    catch(e)
    {
        response.status(400).send({message: e})
    }
}

exports.getUser = async (request, response) =>
{
    const history = await HistoryPoints.find({})
    const user = await User.find({});
    const code = await Code.find({});
    response.status(200).send({user, code, history});
}

exports.deleteUser = async (request, response) =>
{
    const history = await HistoryPoints.deleteMany({})
    const user = await User.deleteMany({});
    const code = await Code.deleteMany({});
    response.status(200).send({user, code, history});
}

