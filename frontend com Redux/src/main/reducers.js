import { combineReducers } from 'redux'
import todoReducer from '../Todo/todoReducer'

//AQUI ESTAMOS CRIANDO NOSSO ARQUIVO REDUCERS QUE SERÁ USADO NA APLICAÇÃO INTEIRA
const rootReducer = combineReducers({
    todo: todoReducer
})

export default rootReducer