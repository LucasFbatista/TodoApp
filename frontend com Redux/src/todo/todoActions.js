import axios from 'axios';


//AQUI SÃO NOSSAS AÇÕES DA NOSSA APLICAÇÃO NO CASO AS AÇÕES SUBSTITUI OS METÓDOS

const URL = 'http://localhost:3003/api/todos';

export const changeDescription = event => ({

    type: 'DESCRIPTION_CHANGED',
    payload: event.target.value
})

export const search = () => {
    
    //DIFERENTE DO QUE FOI FEITO NO FRONTEND SEM REDUX AQUI ESTAMOS USANDO UM FACET DO THUNK MIDDLEWARE
    //ELE CAPTURA O ESTADO DIRETO DA NOSSA TODO NO CASO A DESCRIPTION E COM ELA CONSEGUIMOS MANIPULAR DO JEITO QUE QUISERMOS
    //AQUI ESTAMOS RECEBENDO DIRETAMENTE O RESPONSE.DATA E PASSAMOS PELO PAYLOAD FAZENDO ASSIM O DISPATCH E MANDANDO PARA O NOSSO
    //TODOREDUCER ASSIM NÃO A NECESSIDADE DE PASSAR O DESCRIPTION EM TODOS OS METODOS COMO PARAMETRO NO SEARCH

    //NÃO FAZER ISSO SEMPRE
    return ( dispatch, getState ) => {

        const description = getState().todo.description
        const search = description ? `&description__regex=/${description}/` : ''
        const request = axios.get(`${URL}?sort=-createdAt${search}`)
              .then(resp => dispatch({ type: 'TODO_SEARCHED', payload: resp.data }))

    }
}


export const add = description => {

    //COMO ESTAMOS UTILIZANDO A BIBLIOTECA MULTI CONSEGUIMOS PASSAR MAIS DE UMA AÇÃO
   //DENTRO DO NOSSO REDUX E EXECUTAR ATRAVÊS DO DISPATCH OUTRA AÇÃO ASSIM QUE A PROMESSA FOR RESOLVIDA NO CASO A ACTION SEARCH
    return dispatch => {

        axios.post(URL, { description })
          .then(resp => dispatch( clear()))
          .then(respo => dispatch(search()))

    }
}

export const markAsDone = todo => {

    return dispatch => {

        axios.put(`${URL}/${todo._id}`, { ...todo, done: true})
            .then( resp => dispatch(search()));
    }
}


export const markAsPending = todo  => {

    return dispatch => {

        axios.put(`${URL}/${todo._id}`, { ...todo, done: false})
            .then( resp => dispatch(search()));
    }
}

export const remove = todo => {

    return dispatch => {

        axios.delete(`${URL}/${todo._id}`)
            .then( resp => dispatch(search()));
    } 

}

export const clear = () => {

    //AQUI TAMBÉM UTILZANDO O MIDDLEWARE MULTI CONSEGUIMOS EXECUTAR DUAS AÇÕES
    return [{ type: 'TODO_CLEAR' }, search()]

}