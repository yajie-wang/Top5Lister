import React, { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import { Fab, TextField, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import ListCard from './ListCard';
import List from '@mui/material/List';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import FunctionsIcon from '@mui/icons-material/Functions';
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SortIcon from '@mui/icons-material/Sort';
import AuthContext from '../auth';
import { useHistory } from 'react-router-dom';

export default function BackGroundPage(){
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const { auth } = useContext(AuthContext);
    const isMenuOpen = Boolean(anchorEl);
    const [ifAdding, setIfAdding] = useState(false);
    const [editActive, setEditActive] = useState(false);
    const history = useHistory();

    useEffect(() => {
         store.loadIdNamePairs();
    }, []);
    
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    function handleHomeClick (){
        auth.swapHomeScreen();
    }

    function handleAllUserClick (){
        auth.swapAllUserScreen();
    }

    function handleSingleUserClick(){
        auth.swapSingleUserScreen();
    }

    function handleCommunityClick(){
        auth.swapCommunityScreen();
    }

    const handleSortbyNewest = () => {
        handleMenuClose();
    }

    const handleSortbyOldest = () => {
        handleMenuClose();
    }

    const handleSortbyViews = () => {
        handleMenuClose();
    }

    const handleSortbyLikes = () => {
        handleMenuClose();
    }

    const handleSortbyDislikes = () => {
        handleMenuClose();
    }

    function searchingHandler(event){
        event.preventDefault();
        console.log("search key: ",event.target.value);
        store.searchingKey = event.target.value;
        store.loadIdNamePairs();
    }



    function handleCreateNewList() {
        setIfAdding(true);
        store.createNewList();
    }
    const menuId = 'primary-sort-list-menu';

    const SortMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            
            
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}

        >
            <MenuItem onClick={handleMenuClose}>Publish Date(Newest)</MenuItem>
            <MenuItem onClick={handleMenuClose}>Publish Date(Oldest)</MenuItem>
            <MenuItem onClick={handleMenuClose}>Views</MenuItem>
            <MenuItem onClick={handleMenuClose}>Likes</MenuItem>
            <MenuItem onClick={handleMenuClose}>Dislikes</MenuItem>
        </Menu>
    );

    let menu = SortMenu;
    var lists = "";
    if(store){
        if((ifAdding || editActive) && store.currentList){
            lists = 
            <List sx = {{marginTop:'1%', width: '90%', left: '5%', bgcolor: 'background.paper'}}>
                {
                    
                    <ListCard
                        key={store.currentList._id}
                        idNamePair = {store.currentList}
                        setIfAdding = {setIfAdding}
                        ifAdding = {ifAdding}
                        editActive = {editActive}
                        setEditActive = {setEditActive}
                    />
                    
                }
            </List>
        }else{
            lists = 
                <List sx = {{ marginTop:'1%', width: '90%', left: '5%', height: '550px', bgcolor: '#fffff1'}}
                style = {{overflow : "auto"}}>
                    {
                        store.idNamePairs.map((pair) =>(
                            <ListCard
                                key={pair._id}
                                idNamePair = {pair}
                                setIfAdding = {setIfAdding}
                                ifAdding = {ifAdding}
                                editActive = {editActive}
                                setEditActive = {setEditActive}
                            />
                        ))
                    }
                </List>
        }
    }


    return (
        <div id = "top5-list-selector">
                    <div id = "list-selector-heading"
                        style = {{position : 'relative'}}>
                        <div id = "top5-list-topbar"
                            style = {{position : 'absolute', top : '0'}}>

                            <IconButton
                            size="large"
                            edge="end"
                            color="inherit"
                            onClick = {handleHomeClick}
                            style = {{ width : "5%",height : "100%", marginRight:"1%"}}>
                            <HomeOutlinedIcon style = {{ width : "150%",height : "150%"}}/> 
                            </IconButton>


                            <IconButton
                            size="large"
                            edge="end"
                            color="inherit"
                            onClick = {handleAllUserClick}
                            style = {{ width : "5%",height : "100%", marginRight:"1%"}}>
                            <GroupsIcon  style = {{ width : "150%",height : "150%"}}/> 
                            </IconButton>

                            <IconButton
                            size="large"
                            edge="end"
                            color="inherit"
                            onClick = {handleSingleUserClick}
                            style = {{ width : "5%",height : "100%", marginRight:"1%"}}>
                            <PersonIcon  style = {{ width : "150%",height : "150%"}}/> 
                            </IconButton>
                            

                            <IconButton
                            size="large"
                            edge="end"
                            color="inherit"
                            onClick = {handleCommunityClick}
                            style = {{ width : "5%",height : "100%", marginRight:"1%"}}>
                            <FunctionsIcon  style = {{ width : "150%",height : "150%"}}/> 
                            </IconButton>
                            

                            <input style = {{width:"45%", height : "100%", marginLeft: "5%"}}
                                id = "top5_lister_search_bar"
                                type = "text"
                                placeholder = "Search in here" 
                                onChange = {(event)=>{searchingHandler(event)}}>
                            
                            </input>

                            <div
                                style = {{width : "20%",height : "100%", marginRight:"-5%"}}
                            >
                                SORT BY
                            </div>

                            
                            <IconButton
                            id ="sortbutton"
                            size="large"
                            edge="end"
                            aria-label="sort choices of lists"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                            style = {{ width : "5%",height : "100%", marginRight:"-10%"}}>
                            <SortIcon style = {{ width : "150%",height : "150%"}}/> 
                        </IconButton >
                        {
                    menu
                     }
                        </div>

                    </div>

                    <div id = "list-selector-list"
                        style =  {{height : 'auto'}}>
                        {lists}
                    </div>
                    <div 
                        style = {{position : "absolute", bottom : '-10%', width : '100%', display : 'flex', justifyContent : 'center'}}>
                        <Fab 
                            color="primary" 
                            aria-label="add"
                            id="add-list-button"
                            onClick={handleCreateNewList}   
                        >
                            <AddIcon />
                        </Fab>
                        <Typography variant="h4"
                            style ={{marginTop : '5pt', marginLeft : '5pt'}}>Your Lists</Typography>
                    </div>
                    
            </div>
    )
}