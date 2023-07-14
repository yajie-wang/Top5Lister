import { useContext, useState } from 'react'
import Icons from '../icons/'
import Top5Item from './Top5Item';
import CommentItem from './CommentItem'
import List from '@mui/material/List';
import { Typography } from '@mui/material';
import { GlobalStoreContext } from '../store'
import TextField from '@mui/material/TextField';
import ListItem from '@mui/material/ListItem';
import Link from '@mui/material/Link';
import AuthContext from '../auth';
import DeleteModal from './DeleteModal';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [text, setText] = useState("");
    const { idNamePair , editActive, setEditActive } = props;
    const [open, setOpen] = useState(false);
    const [cardClick, setClickOpen] = useState(false);
    const ifAdding = props.ifAdding;
    const { auth } = useContext(AuthContext);
 

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        
        store.markListForDeletion(id);

        setOpen(true);
    }
    function handleEditList(event, id){
        store.setCurrentList(id)
        setEditActive(true);
    }


    function handleLoadList(event, id) {
        if (!event.target.disabled) {
            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);    
        }
    }


    function handleCardClick(value, id){
        store.setCurrentList(id);
        setClickOpen(value);
    }

    function handleCloseList(){
        store.updateCurrentList();
        store.closeCurrentList();
    }

    async function handlePublishClose(){
        store.updateCurrentList();
        store.publishList(idNamePair._id, idNamePair.name, idNamePair.items);
        store.closeCurrentList();
        props.setEditActive(false);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            event.stopPropagation();
            store.setCurrentList(id);
            setOpen(false); 
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
        store.currentList.name = event.target.value;
    }

    function handleCloseCancel (event, id){
        event.stopPropagation();
        store.setCurrentList(id);
        setOpen(false); 
        store.unmarkListForDeletion();
    }

    function handleCloseConfirm(event){
        event.stopPropagation();
        setOpen(false);
        store.deleteMarkedList();
    }



    function handleNumberOfViewChange(id){
        store.increaseViewNumber(id);
    }
    if (store.currentList) {
        var publishedItems = 
            <div id="view-items" sx={{ width: '100%', bgcolor: 'background.paper', height :'50%', position : 'relative'}}>
                {
                    
                    idNamePair.items.map((item, index) => (
                        <Top5Item 
                            
                            key={'top5-item-' + (index+1) + item}
                            text={item}
                            index={index} 
                        />
                    ))
                }
            </div>;
        
        var publishedComments =
                <List id="comment-items" sx={{ width: '95%', bgcolor: 'background.paper', height : "50%", position : 'relative', overflowY:'scroll',}}>
                    {
                        store.currentList.comments.map((comment, index) => {

                            return <CommentItem sx={{ }}
                                key={'top5-comment-' + (index+1) + comment}
                                comment = {comment}
                                author = {store.currentList.commentAuthors[index]}
                            />
                        })
                    }
                </List>;

    }
    let showingPart = <Link  onClick={(event) => {
        handleEditList(event, idNamePair._id)
    }}>edit</Link>

    if(idNamePair.ifPublished){
        showingPart = <div style = {{ marginTop : "5pt"}}> Published: {idNamePair.date}
        </div>
    }

    if((ifAdding || editActive) && store.currentList){
        var addingLists = 
        <List id="edit-items" sx={{ bgcolor: 'background.paper', width: '100%' }}>
            {
                store.currentList.items.map((item, index) => (
                    <Top5Item
                        key = {'top5-item-' + (index+1) +item}
                        text = {item}
                        index = {index}
                        ifAdding = {ifAdding}
                        editActive = {editActive}
                        setEditActive = {setEditActive}>
                    </Top5Item>
                ))
            }
        </List>
    }
    let displayCardColor = idNamePair.ifPublished ? '#d9d6f2' : '#e8e4cc'
    let cardElement =
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ display: 'flex', p: 1 , backgroundColor : displayCardColor}}
            style={{
                display : "flex",
                justifyContent : "space-between",
                border: '1px solid black',
                width: '100%',
                height: 'auto'
            }}
        >
                <div 
                    style = {{display : "flex", flexDirection : "column"}}>
                    <div 
                        style = {{fontWeight: 'bold'}}>
                        {idNamePair.name}
                    </div>
                    <div
                        style = {{ marginTop : "10pt"}}>
                        By: {idNamePair.author}
                    </div>
                {showingPart}
                </div>

                <div
                    style = {{display : "flex", flexDirection : "column", width : "50%"}}>
                    
                    <div
                        style = {{display : "flex", flexDirection : "row" }}>
                        <div
                            style = {{display : "flex", width : '4rem', marginRight : '1rem', flexDirection : "row", height : '4rem'}}>
                            <img src = {Icons.icon_like}
                            _id = {idNamePair._id}
                            style = {{ height : '48px', width : '39px'}}
                            onClick = {(event) => {
                                event.stopPropagation();
                                    store.increaseLikeNumber(event.target.getAttribute("_id"))}}>

                            </img>
                            <div 
                                style = {{marginLeft : '5pt', marginTop : '10pt'}}>
                                {idNamePair.likeNumber}
                            </div>
                        </div>
                        

                        <div
                            style = {{display : "flex", flexDirection : "row", height : '4rem', width : '4rem'}}>
                            <img src = {Icons.icon_dislike}
                            style = {{  width : '39px', marginTop : '5px', marginTop:'13pt', height : '48px'}}
                            _id = {idNamePair._id}
                            onClick = {(event) => {
                                event.stopPropagation();
                                store.decreaseLikeNumber(event.target.getAttribute("_id"))}}>
                            </img>
                            <div
                                style = {{marginLeft : '5pt', marginTop : '10pt'}}>
                                {idNamePair.dislikeNumber}
                            </div>
                        </div>

                        <img src = {Icons.icon_delete}
                            style = {{  marginTop : '5px', height : '48px', marginTop:'13pt', width : '39px'}}
                            onClick = {(event)=>{ handleDeleteList(event, idNamePair._id) }}>
                            
                        </img>
                    </div>


                    <div
                        style = {{display : "flex", flexDirection : "row" , justifyContent : "space-between"}}>
                            <div>
                                Views: {idNamePair.viewNumber}
                            </div>
                            <img src = {Icons.icon_downArrow}
                                _id = {idNamePair._id}
                                style = {{maxWidth : '10%', maxHeight : '10%'}}             
                                onClick={(event) => {
                                    handleCardClick(!cardClick,idNamePair._id );
                                    handleNumberOfViewChange(event.target.getAttribute("_id"));
                                    handleLoadList(event, idNamePair._id);
                                }}
                                >
                            </img>
                    </div>
                    
                </div>
                <DeleteModal open = {open} close = {
                    (event) => {
                    handleCloseCancel(event, idNamePair._id)} }
                    name = {idNamePair.name} 
                    confirm = {handleCloseConfirm}/>
        </ListItem>

if (cardClick) {
    cardElement = 
     <ListItem
        id={idNamePair._id}
        key={idNamePair._id}
        sx={{ display: 'flex', p: 1 , border: 1, borderColor:'gray', backgroundColor: displayCardColor, fontSize : '15pt',width :"100%",
                flexDirection : "row", justifyContent : "between" ,}}

    >
            <div 
                style = {{display : "flex", flexDirection : "column", width:"50%"}}>
                <div 
                    style = {{fontWeight: 'bold'}}>
                    {idNamePair.name}
                </div>
                <div
                    style = {{ marginTop : "10pt"}}>
                    By: {idNamePair.author}
                </div>
                {publishedItems}
                {showingPart}
            </div>

            <div
                style = {{display : "flex", flexDirection : "column",width :"50%"}}>
                
                <div
                    style = {{display : "flex", flexDirection : "row" }}>
                    <div
                        style = {{display : "flex", flexDirection : "row", height : '4rem', width : '4rem', marginRight : '1rem'}}>
                        <img src = {Icons.icon_like}
                        style = {{ height : '48px', width : '39px'}}
                        _id = {idNamePair._id}
                        onClick = {(event) => {
                                event.stopPropagation();
                                store.increaseLikeNumber(event.target.getAttribute("_id"))}}>
                        </img>
                        <div 
                            style = {{marginLeft : '5pt', marginTop : '10pt'}}>
                                {idNamePair.likeNumber}
                            
                        </div>
                    </div>
                    

                    <div
                        style = {{display : "flex", flexDirection : "row", height : '4rem', width : '4rem'}}>
                        <img src = {Icons.icon_dislike}
                        style = {{ marginTop:'13pt', height : '48px', width : '39px', marginTop : '5px'}}
                        _id = {idNamePair._id}
                            onClick = {(event) => {
                                event.stopPropagation();
                                store.decreaseLikeNumber(event.target.getAttribute("_id"))}}>
                        </img>
                        <div
                            style = {{marginLeft : '5pt', marginTop : '10pt'}}>
                                {idNamePair.dislikeNumber}
                        </div>
                    </div>

                    <img src = {Icons.icon_delete}
                        style = {{ marginTop:'13pt', height : '48px', width : '39px', marginTop : '5px'}}
                        onClick = {(event)=>{handleDeleteList(event, idNamePair._id)}}>
                        
                    </img>

                    
                </div>

                <div
                    style = {{height: '15rem'}}>
                        {publishedComments}
                        <TextField
                            style = {{width: '37rem'}}
                            name = "comment-sent-text-field"
                            id = "comment-sent-text-field"
                            label = 'Add Comment'
                            required
                            fullWidth
                            inputProps = {{style:{fontSize:12}}}
                            onKeyPress={(event)=>{if(event.key === "Enter" && event.target.value != "") {store.publishComment(idNamePair._id, auth.user.userName, event.target.value);
                            event.target.value = ""}}}>

                    </TextField>
                </div>

                <div
                    style = {{marginTop: "10%",display : "flex", flexDirection : "row", justifyContent : "space-between"}}>
                        <div>
                            Views: {idNamePair.viewNumber}
                        </div>
                        <img src = {Icons.icon_upArrow} 
                         onClick={() => {setClickOpen(!cardClick);
                            store.closeCurrentList();
        }}
                            style = {{maxWidth : '10%', maxHeight : '10%'}}
                            >
                        </img>
                </div>
                
            </div>

            <DeleteModal open = {open} close = {
                    (event) => {
                    handleCloseCancel(event, idNamePair._id)} }
                     name = {idNamePair.name} confirm = {handleCloseConfirm}/>
            
    </ListItem>
        
}else if(ifAdding|| editActive){
    cardElement = 
    <div id = 'top5-worksapce'
        style = {{height : '36rem'}}>
        <div id = "workspace-edit" style = {{backgroundColor : '#a7a7a7'  }}
            >
            <input id = 'top5-name-input'
                type = "text"
                placeholder = "Put your list name in here"
                style = {{width : "99.5%"}}
                //value = {idNamePair.name}
                onChange={(ev)=>setText(ev.target.value)}
                onChange={handleUpdateText}

                ></input>
            <div
                style = {{display : "flex", flexDirection : "row"}}>
                <div style = {{width : '20%', height:'80%'}}>
                    <div className = 'item-number'><Typography style = {{fontSize : '27pt', marginTop : '2.9rem'}}>1.</Typography></div>
                    <div className = 'item-number'><Typography style = {{fontSize : '27pt', marginTop : '2.9rem'}}>2.</Typography></div>
                    <div className = 'item-number'><Typography style = {{fontSize : '27pt', marginTop : '2.9rem'}}>3.</Typography></div>
                    <div className = 'item-number'><Typography style = {{fontSize : '27pt', marginTop : '2.9rem'}}>4.</Typography></div>
                    <div className = 'item-number'><Typography style = {{fontSize : '27pt', marginTop : '2.9rem'}}>5.</Typography></div>
                </div>
                {addingLists}
            </div>
            <div
                style = {{backgroundColor : 'rgb(189, 187, 227)', height : '9%',   }}
                >
            
            <button style = {{ height : '60%', width :'20%', background: '#e7d7a7', float: 'right' }}
                onClick = {(event)=>{props.setIfAdding(false);
                    setEditActive(false);
                    handleCloseList()}}>
                Save
            </button>
            
            <button style = {{ height : '60%', width :'20%', background: '#e7d7a7', float: 'right'}}
                onClick = {()=>{props.setIfAdding(false) 
                     setEditActive(false)
                     handlePublishClose() }}>
                Publish
            </button>
            </div>
            
        </div>
    </div>
}



return (
    cardElement
);
}

export default ListCard;