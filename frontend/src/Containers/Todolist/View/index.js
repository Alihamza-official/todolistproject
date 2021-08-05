
import React , {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';

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
    },

    setoo : {
        alignItem: 'center'
    },

    margin: {
        margin: theme.spacing(1),
      },
      withoutLabel: {
        marginTop: theme.spacing(3),
      },
      textField: {
        width: '25ch',
      },
}));


const ViewComponent = () => {
    const classes = useStyles();

    const location = useLocation();
    const history = useHistory();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect( () => {
      if(location.pathname == "/todolist/view")
      {
        setTitle("View TodoList");
        setTitle(location.state.title);
        setDescription(location.state.description);
      }
      
     

    }, []);

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
               
               <h1> View </h1>
               <Grid item xs={12}>
                  <Paper className={classes.paper}>
                  <form className={classes.root} noValidate autoComplete="off">

                    <TextField 
                        id="standard-read-only-input"
                        value={title}
                        InputProps={{ readOnly: true,}}
                        style = {{width: "500px"}}
                        disabled
                    /> <br/> <br/>

                    <TextareaAutosize
                       label="Description" 
                        aria-label="minimum height" 
                        minRows={5} 
                        minCols={50}
                        placeholder="Description" 
                        value={description} 
                        style = {{width: "500px"}}
                        InputProps={{ readOnly: true,}}
                        disabled
                    /> <br/> <br/>

                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={ () => history.replace("/todolist", "/todolist/add") }
                    >  
                        Ok  
                    </Button>   
                  </form>
                  </Paper>
               </Grid>
              

           </Grid>
           

        </div>
    )
}

export default ViewComponent;