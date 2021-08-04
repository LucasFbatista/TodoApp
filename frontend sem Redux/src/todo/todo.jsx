import React, { Component } from 'react';
import axios from 'axios';


import PageHeader from '../template/pageHeader';
import TodoForm from '../todo/todoForm';
import TodoList from '../todo/todoList';

const URL = 'http://localhost:3003/api/todos';

export default class Todo extends Component {

    constructor(props){
        super(props)
        this.state = { description:'', list:[] }
        this.handleAdd = this.handleAdd.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleClear = this.handleClear.bind(this)


        this.handleRemove = this.handleRemove.bind(this)
        this.handleMarkAsDone = this.handleMarkAsDone.bind(this)
        this.handleMarkAsPending = this.handleMarkAsPending.bind(this)
        //PASSAMOS O METODO NO CONSTRUTOR QUE ASSIM ELE INICIA MEU COMPONENTE CARREGANDO A FUNÇÃO
        this.refreshList()
    }


    refreshList(description = '') {

        //AQUI ESTAMOS VERIFICANDO SE CONTÉM ALGUM VALOR DE PESQUISA PASSADO NO INPUT VIA DESCRIPTION
        // SE TIVER SERÁ PESQUISADO E CONCATENADO NA URL DE REQUEST SE NÃO SERÁ VAZIO E RETONARA A LISTA
        const search = description ? `&description__regex=/${description}/` : ''
        //AQUI IREMOS TRAZER A LISTA MAIS ATUAL NO BANCO DEPOIS DO REQUEST NOS SETAMOS O DESCRIPTION COMO DEFAULT E PASSAMOS O 
        //DATA REQUEST PARA NOSSA LISTA STATE.
        axios.get(`${URL}?sort=-createdAt${search}`)
            .then(resp => this.setState({ ...this.state, description, list: resp.data }))

    }

    handleSearch() {

        this.refreshList(this.state.description)

    }

    handleChange(e) {
        //AQUI ESTAMOS PEGANDO TODO O ESTADO DO NOSSO COMPONENTE QUE NO CASO SÃO 2 USANDO SPRED ...
        //E DENTRO DE description ESTAMOS SETANDO O VALOR DELE COM O VALOR QUE ESTA SENDO DIGITADO NO INPUT
        //COM EVENT.TARGET.VALUE
        this.setState({ ...this.state, description: e.target.value })

    }

    handleAdd(){
        const description = this.state.description
        axios.post(URL, { description })
         .then(resp => this.refreshList())
    }

    handleRemove(todo) {
        axios.delete(`${URL}/${todo._id}`)
            .then( resp => this.refreshList(this.state.description))

    }

    handleMarkAsDone(todo) {
        axios.put(`${URL}/${todo._id}`, { ...todo, done: true })
            .then( resp => this.refreshList(this.state.description))
    }

    handleMarkAsPending(todo){
        axios.put(`${URL}/${todo._id}`, { ...todo, done: false })
            .then( resp => this.refreshList(this.state.description))
    }

    handleClear() {
        this.refreshList();
    }

    render() {
        return( 
            <div>
                <PageHeader name='Tarefas' small='Cadastro'></PageHeader>
                <TodoForm
                    description={this.state.description}
                    handleAdd={this.handleAdd} 
                    handleChange={this.handleChange}
                    handleSearch={this.handleSearch}
                    handleClear={this.handleClear}
                />
                <TodoList 
                    list={this.state.list} 
                    handleRemove={this.handleRemove}
                    handleMarkAsDone={this.handleMarkAsDone}
                    handleMarkAsPending={this.handleMarkAsPending}
                />
            </div>
        )
    }
}