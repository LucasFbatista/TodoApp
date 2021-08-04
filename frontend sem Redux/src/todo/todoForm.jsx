import React from 'react';

import Grid from '../template/grid';
import IconButton from '../template/iconButton';


export default props => {

    //AQUI IREMOS ADICIONAR UM ATALHO AO NOSSO TECLADO
    //QUANDO APERTA 'ENTER' SERÁ ADICIONADO UMA NOVA TAREFA QUANDO APERTADO 'ENTER' + 'SHIFT' SERÁ FEITO UMA PESQUISA DAQUELE REGISTRO
    //QUANDO APERTADO ESC O CAMPO INPUT SERÁ LIMPADO
    const keyHandler = (e) => {

        if(e.key === 'Enter'){
            e.shiftKey ? props.handleSearch() : props.handleAdd()
        }else if (e.key === 'Escape') {
            props.handleClear()
        }
    }

    return (

        <div role='form' className='todoForm'>
            <Grid cols='10'>
                <input 
                    id='description' 
                    className='form-control' 
                    placeholder='Adicione uma tarefa'
                    onChange={props.handleChange} 
                    value={props.description}
                    onKeyUp={keyHandler}>
                </input>
            </Grid>
            <Grid cols='12 3 2'>
                <IconButton 
                    style='primary' 
                    icon='plus' 
                    onClick={props.handleAdd}>
                </IconButton>
                <IconButton 
                    style='info' 
                    icon='search' 
                    onClick={props.handleSearch}>
                </IconButton>
                <IconButton 
                    style='default' 
                    icon='close'
                    onClick={props.handleClear}>
                </IconButton>
            </Grid>
        </div>

    )

}

    

