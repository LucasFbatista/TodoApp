const port = 3003

const bodyParser = require('body-parser')
const express = require('express')
const server = express()
//AQUI HABILITAMOS NO CASO CHAMAMOS O CORS
const allowCors = require('./cors')

//CONFIGURAÇÃO PARA CONVERSÃO DO CORPO DA NOSSA REQUISIÇÃO PARA ACEITAR FORM URLENCODED E JSON
server.use(bodyParser.urlencoded({ extended: true}))
server.use(bodyParser.json())
server.use(allowCors)

// CONFIG MIDDLEWARES
server.listen(port, function() {
    
    console.log(`BACKEND is running on port ${port}.`)
})

module.exports = server