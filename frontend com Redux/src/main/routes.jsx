import React from 'react';
import { Router, Route, Redirect, hashHistory } from 'react-router';

//AQUI ESTAMOS DEFININDO AS NOSSAS ROTAS E TAMBÉM USANDO O PADRÃO DE hasHistory PARA CONSEGUIR VOLTAR AS ROTAS ANTERIORES
import Todo from '../todo/todo';
import About from '../about/about';

export default props => (

    <Router history={hashHistory}>
        <Route path='/todos' component={Todo}/>
        <Route path='/about' component={About}/>
        <Redirect from='*' to='/todos'/>
    </Router>


)