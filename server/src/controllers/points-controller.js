'use strict'

// IMPORTA OS MÓDULOS NECESSÁRIOS
const auth = require('../middlewares/auth-middleware')
const points = require('../middlewares/points-middleware')

// CREDITO 1 PONTO POR VISUALIZAÇÃO
exports.creditPoints = async (request, response) =>
{
    try
    {
        if(await auth.validateToken(request.body.publicCode, request.body.token))
        {             
            const res = await points.creditPoints(request)

            if(res == true)
            {
                response.status(200).send({message: 2001})
            }
            else
            {
                console.log(res)
                response.status(400).send({res})
            }
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

// CREDITA PONTOS REFERENTES A CÓDIGOS DE REFERÊNCIA
exports.creditPointsByCode = async (request, response) =>
{
    try
    {
        if(await auth.validateToken(request.body.publicCode, request.body.token))
        {
            if(await points.validateCode(request.body.referencial, request.body.publicCode))
            {
                const res = points.creditByReferencial(request)

                if(res == true)
                {
                    response.status(200).send({message: 2001})
                }
                else
                {
                    response.status(400).send({res})
                }   
            }
            else
            {
                response.status(400).send({message: 'Code already used'})
            }
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
