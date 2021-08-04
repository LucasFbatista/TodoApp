const mongoose = require('mongoose')

//SERVER PARA TIRR MENSAGEM DE DEPRECIADO NO MONGOOSE
mongoose.Promise = global.Promise

module.exports = mongoose.connect('mongodb://localhost:27017/todoDb')