import { ListItem } from "@mui/material";
import { React, useContext, useState } from "react";
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';


export default function CommentItem(props){
    const {store} = useContext(GlobalStoreContext)
    const [text, setText] = useState(props.text);
    
    let authors = props.commentAuthors;

    let returnItem = null;

    let {index} = props;
        returnItem = 
            <ListItem
                className="top5-list-comment"
                sx={{ display: 'flex', p: 1 ,  }}
                style={{width: '100%', display : "flex", flexDirection : "column", }}
                >
                    <div style={{float: 'left' }}>
                        {props.author}
                    </div>
                        
                    <div style={{ textalign: 'left' }}>
                        {props.comment}
                    </div>

            </ListItem>
        return (returnItem);
    }
    