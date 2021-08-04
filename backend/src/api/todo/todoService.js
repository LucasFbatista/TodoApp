const Todo = require('./todo')

//AQUI CRIAMOS TODOS OS NOSSOS METODOS REST COM VALIDAÇÕES
Todo.methods(['get', 'post', 'put', 'delete'])
//ESSA LINHA ADICIONAÇÇ SERVER PARA O RESTFUL TRAZER OS DADOS DO USUÁRIO ATUALIZADO 
//E VALIDAR QUALQUER ATUALIZAÇÃO QUE POR PADRÃO NÃO É FEITA.
Todo.updateOptions({new: true, runValidators: true})

module.exports = Todo