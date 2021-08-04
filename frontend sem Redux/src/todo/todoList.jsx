import React from 'react';
import IconButton from '../template/iconButton';

export default props => {

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
                        onClick={() => props.handleMarkAsDone(todo)}>
                    </IconButton>
                    <IconButton 
                        style='warning' 
                        hide={!todo.done}
                        icon='undo'
                        onClick={() => props.handleMarkAsPending(todo)}>
                    </IconButton>
                    <IconButton 
                        style='danger' 
                        hide={!todo.done}
                        icon='trash-o'
                        onClick={() => props.handleRemove(todo)}>
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