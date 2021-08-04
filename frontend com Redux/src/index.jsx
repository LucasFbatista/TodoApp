import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
//MIDDLEWARES
//AGUARDA A PROMESSA SER RESOLVIDA PARA CARREGAR OS DADOS
import promise from 'redux-promise';
//CONSIGO PASSAR MAIS DE UMA AÇÃO DENTRO DA DE UMA ACTIONS FUNCTION
import multi from 'redux-multi';
//CONSIGO FAZER REQUISIÇÕES SÍNCRONAS E ASSSÍNCRONAS
import thunk from 'redux-thunk'

import App from './main/app';
import reducers from './main/reducers';


//AQUI ESTAMOS INTEGRANDO NOSSA APLICAÇÃO COM O PLUGIN DE MONITORAMENTO DE ESTADO 
//DO GOOGLE CHROME OPCIONAL
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//AQUI PASSAMOS NOSSO MIDDLEWARE ONDE IRÁ RECEBER NOSSA PROMISSE LIST
//E DEVOLVER LOGO APÓS SER RESOLVIDA
const store = applyMiddleware(thunk, multi, promise)(createStore)(reducers, devTools)
ReactDOM.render(
//AQUI ESTOU PASSANDO PARA O RENDER DOM DO REACT QUAL ARQUIVOS ELE IRÁ
//RENDERIZAR PELO ID
//PASSAMO TAMBÉM O PROVINDER DO REDUX ASSIM PASSSAMO NOSSOS REDUCERS
    <Provider store={store}>
        <App/>
    </Provider>
, document.getElementById('app'));