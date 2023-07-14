import { React, useContext, useState } from "react";
import { GlobalStoreContext } from '../store'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
/*
    This React component represents a single item in our
    Top 5 List, which can be edited or moved around.
    
    @author McKilla Gorilla
*/
function Top5Item(props) {
    const { store } = useContext(GlobalStoreContext);
    const editActive = props.editActive;
    const setEditActive = props.setEditActive;
    const [text, setText] = useState(props.text);

    const ifAdding = props.ifAdding;

    function handleItemchange(event){
        store.currentList.items[props.index]= event.target.value;
        setText(event.target.value);
    }


    function toggleEdit(){
        let newActive = !editActive;
        if(newActive){
            store.setIsItemEditActive();
        }
        setEditActive(newActive);
    }

    function handleToggleEdit(event){
        event.stopPropagation();
        toggleEdit();
    }


    let { index } = props;


    let itemClass = "top5-item";
    let returnItem = null;
        returnItem = 
        <div
            id={'item-' + (index+1)}
            className={itemClass}
            sx={{ display: 'flex', p: 1 }}
            style={{
                fontSize: '24pt',
                width: '100%'
            }}
        >
                <Box sx={{ p: 1, flexGrow: 1 }}>{index+1}. {props.text}</Box>
        </div>

        if(ifAdding|| editActive){
            returnItem = 
            <TextField
                margin="normal"
                required
                fullWidth
                id={"item-" + (index+1)}
                label="Top 5 Item Name"
                name="name"
                autoComplete="Top 5 List Name"
                className='list-card'
                onKeyPress={handleItemchange}
                onBlur = {handleItemchange}
                onChange={(ev)=>setText(ev.target.value)}
                defaultValue={text}
                inputProps={{style: {fontSize: 30}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
        }
    
    

    return (
        returnItem
    )
}

export default Top5Item;