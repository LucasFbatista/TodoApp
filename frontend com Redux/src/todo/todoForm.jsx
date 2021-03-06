import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators  } from 'redux';

import Grid from '../template/grid';
import IconButton from '../template/iconButton';
import { add, changeDescription, search, clear  } from './todoActions';


class TodoForm extends Component {

    constructor(props){
        super(props)
        this.keyHandler = this.keyHandler.bind(this)
    }

    componentDidMount() {
        this.props.search()
    }

    //AQUI IREMOS ADICIONAR UM ATALHO AO NOSSO TECLADO
    //QUANDO APERTA 'ENTER' SERÁ ADICIONADO UMA NOVA TAREFA QUANDO APERTADO 'ENTER' + 'SHIFT' SERÁ FEITO UMA PESQUISA DAQUELE REGISTRO
    //QUANDO APERTADO ESC O CAMPO INPUT SERÁ LIMPADO
    keyHandler(e){

        const { add, search, description, clear} = this.props

        if(e.key === 'Enter'){
            e.shiftKey ? search(description) : add(description)
        }else if (e.key === 'Escape') {
           clear()
        }
    }

    render() {

        const { add, search, description} = this.props
    
        return(

            <div role='form' className='todoForm'>
                <Grid cols='10'>
                    <input 
                        id='description' 
                        className='form-control' 
                        placeholder='Adicione uma tarefa'
                        onChange={this.props.changeDescription} 
                        value={this.props.description}
                        onKeyUp={this.keyHandler}>
                    </input>
                </Grid>
                <Grid cols='12 3 2'>
                    <IconButton 
                        style='primary' 
                        icon='plus' 
                        onClick={() => add(description)}>
                    </IconButton>
                    <IconButton 
                        style='info' 
                        icon='search' 
                        onClick={() => search(description)}>
                    </IconButton>
                    <IconButton 
                        style='default' 
                        icon='close'
                        onClick={this.props.clear}>
                    </IconButton>
                </Grid>
            </div>

        )
    }

}

//AQUI ESTAMOS OBTENDO O ATRIBUTO DESCRIPTION DA NOSSA STORE REDUCERS E MAPEANDO PARA 
// A NOSSA PROPS COMPONENT
const mapStateToProps = state => ({ description: state.todo.description })

//ESSE METÓDO SERÁ REPOSNSÁVEL POR DISPARAR AS AÇÕES PARA TODOS OS REDUCERS FAZENDO O DISPATCH
const mapDispatchToProps = dispatch => bindActionCreators({ add, changeDescription, search, clear }, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(TodoForm)