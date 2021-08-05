

import React, { useEffect, useState, useContext } from 'react';
import {useLocation} from 'react-router-dom';
import { useHistory} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';
import { RootContext } from '../../../Context/RootContext';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },

    seto:  {
        textAlign: 'center',
        alignItem: 'center',
    },

    setoo : {
        alignItem: 'center'
    }
}));

const Inbox = () => {

    const classes = useStyles();

    const location = useLocation();
    const history = useHistory();
    const [spinner, setSpinner ] = useState(false);
    const { token , setToken } = useContext(RootContext);
    const { user , setUser } = useContext(RootContext);
    const {  notes, setNotes } = useContext(RootContext);

    useEffect( () => {

        setSpinner(true);

        const headers = {
            'Content-Type': 'application/json',
            'auth': token
          }

          try {
             
            axios.get(`http://localhost:3001/todolist/${user.id}`, {
                headers: headers
              })
              .then((response) => { 

                const a = response.data.data;
                setSpinner(false);
                setNotes(a);
                console.log(a);

               
  
              })
              .catch((error) => {
                //   console.log("Error comes 2");
  
              })
          } catch (err) {
                // console.log("Error Comes ");
          }
         
    }, []);

    const deleteNoteHandler = (note_id) => {
        // console.log("Item id is ", note_id);
        const headers = {
            'Content-Type': 'application/json',
            'auth': token
          }

        try {
            setSpinner(true);
            axios.delete(`http://localhost:3001/todolist/${user.id}`,  {
                    headers: headers,
                    data: {
                        note_id
                    }
                })
                .then((response) => { 
                    // console.log(response);

                    let tempList = [...notes];
                    let filterList = tempList.filter( (note, index) => note._id !== note_id);

                    // console.log(filterList);
                    setSpinner(false);
                    setNotes(filterList);

                })
                .catch((error) => {
                    // console.log("Error comes 2");

                })

        } catch (err) {
            // console.log("Error Comes ");
        }

    }

    return (

        <div className={classes.root}>
      
            <Grid container spacing={3}>
               
                <Button 
                    variant="contained" 
                    color="secondary" 
                    onClick={ () => history.push({pathname: "todolist/add"})}
                    >  
                    <AddIcon></AddIcon>  
                </Button>  
                <LinearProgress />
                <LinearProgress color="secondary" />
               
                <Grid item xs={12}>
                    <Paper className={classes.paper}>

                    { spinner && <LinearProgress > </LinearProgress> }
                        {
                            notes.map( (item, index) => {
                                return(
                                    <div>
                                        {/* <Paper className={classes.paper}> */}
                                            <h1 className={classes.seto}> { item.title } </h1>
                                            <p className={classes.seto}>  { item.description }</p>

                                            <Button 
                                                
                                                variant="contained" 
                                                color="primary" 
                                                className={classes.setoo} 
                                                onClick = { () => { 
                                                    console.log("Item is ", item);
                                                    history.replace({pathname: "/todolist/edit", state: item })
                                                }}
                                            > <EditIcon className={classes.setoo}>  </EditIcon>  </Button> 
                                           
                                            <Button 
                                                variant="contained" 
                                                color="secondary" 
                                                className={classes.setoo}
                                                onClick = { () => deleteNoteHandler (item._id) }
                                            >  <DeleteIcon></DeleteIcon>   </Button> 
                                            
                                        {/* </Paper> */}
                                    </div>
                                )
                            })
                        }
                    </Paper>
                </Grid>
               

            </Grid>
       
        </div>
    )
}

export default Inbox;