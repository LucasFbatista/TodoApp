import React from 'react';
import ReactDOM from 'react-dom';


import App from './main/app';


//AQUI ESTOU PASSANDO PARA O RENDER DOM DO REACT QUAL ARQUIVOS ELE IRÁ
//RENDERIZAR PELO ID
ReactDOM.render(<App />, document.getElementById('app'));