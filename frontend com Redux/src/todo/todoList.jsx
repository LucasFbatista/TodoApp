import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators  } from 'redux';
import IconButton from '../template/iconButton';


import { markAsDone, markAsPending, remove } from './todoActions';

const TodoList = props => {

    const renderRowns = () => {

        //AQUI USAMOS COMO UM TERNÁRIO SE CONTER ALGO EM props.list ELE IRÁ MOSTRA CASO NÃO ELE IRÁ ADICIONAR UM ARRAY VAZIO
        const list = props.list || []

        return list.map(todo => (

            <tr key={todo._id}>
                <td className={ todo.done ? 'markedAsDone' : '' }>{todo.description}</td>
                <td>
                    <IconButton 
                        style='success'
                        hide={todo.done}
                        icon='check'
                        onClick={() => props.markAsDone(todo)}>
                    </IconButton>
                    <IconButton 
                        style='warning' 
                        hide={!todo.done}
                        icon='undo'
                        onClick={() => props.markAsPending(todo)}>
                    </IconButton>
                    <IconButton 
                        style='danger' 
                        hide={!todo.done}
                        icon='trash-o'
                        onClick={() => props.remove(todo)}>
                    </IconButton>
                </td>
            </tr>

        ))
    }
 
    return (

        <table className="table">
            <thead>
                <tr>
                    <th>Descrição</th>
                    <th className='tableActions'>Ações</th>
                </tr>
            </thead>
            <tbody>
                {renderRowns()}
            </tbody>
        </table>

    )
}

//AQUI ESTAMOS OBTENDO O ATRIBUTO DESCRIPTION DA NOSSA STORE REDUCERS E MAPEANDO PARA 
// A NOSSA PROPS COMPONENT
const mapStateToProps = state => ({ list: state.todo.list })
const mapDispatchToProps = dispatch => bindActionCreators({ markAsDone, markAsPending, remove }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
