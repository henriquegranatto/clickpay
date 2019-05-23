'use strict'

// IMPORTANDO OS MÓDULOS NECESSÁRIOS
const mongoose = require('mongoose')
const User = mongoose.model('User')
const auth = require('../middlewares/auth-middleware')
const user = require('../middlewares/user-middleware')

// REALIZA A AUTENTICAÇÃO DE LOGIN
exports.loginUser = async (request, response) =>
{
    try
    {        
        const data = await auth.findUser(request.body.email);
        const res = await auth.decodePassword(request.body.email, request.body.password)
        
        if(res)
        {
            try
            {
                const token = await auth.createToken(data.publicCode);
                const update = await auth.updateToken(data.publicCode, token);

                if(token.length > 0 && update)
                {
                    response.status(200).send({publicCode: data.publicCode, token: token})
                }
            }
            catch(e)
            {
                response.status(400).send({message: 4001})
            }
        }
        else
        {
            response.status(400).send({message: 4001});
        }
    }
    catch(e)
    {
        response.status(400).send({message: 4001})
    }
}

// REALIZA A REDEFINIÇÃO DE SENHA DO USUÁRIO
exports.redefineUserPassword = async (request, response) =>
{
    try
    {
        const teste = user.validateEmail(request.body.email);
        const password = base64encode(Date.now());
        const encodePassword = await auth.encodePassword(password);

        if(teste)
        {
            if(await User.findOneAndUpdate({email: request.body.email}, {password: encodePassword}))
            {
                response.status(200).send({password: password});        
            }
        }
    }
    catch(e)
    {
        console.log(e)
    }
}