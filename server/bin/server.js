'use strict'

// IMPORTANDO OS MÓDULOS NECESSÁRIOS
const http = require('http');
const app = require('../src/app');
const normalizePort = require('./config-server.js')

// CONFIGURANDO A PORTA DO SERVIDOR
const port = normalizePort(process.env.PORT ||  '80');

// CRIANDO O SERVIDOR
const server = http.createServer(app);

// CONFIGURANDO O SERVIDOR PARA ESCUTAR A PORTA INFORMADA
server.listen(port);

console.log(`Servidor rodando na porta ${port}`);