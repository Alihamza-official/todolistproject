
import React , {useEffect, useState, useContext} from 'react';
import {useLocation} from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import * as yup from 'yup';
import { Formik, Form } from "formik";
import axios from 'axios';

import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';
import { RootContext } from '../../../Context/RootContext';
import LinearProgress from '@material-ui/core/LinearProgress';

let schema = yup.object().shape({
  title: yup.string().required("Title is required "),
  description: yup.string().required("Description is required ")
  
});

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


const FormComponent = () => {
    const classes = useStyles();

    const [spinner, setSpinner ] = useState(false);

    const location = useLocation();
    const history = useHistory();
    const [title, setTitle] = useState("");
    const [initialValues, setInitialValues ] = useState({ title:"", description:""}) ;
    const [display, setDisplay] = useState(false);
    const { token , setToken } = useContext(RootContext);
    const { user , setUser } = useContext(RootContext);

    useEffect( () => {
     
      setSpinner(true);
      // console.log(location.pathname);
      if(location.pathname == "/todolist/add")
      {
        // console.log('found');
        setTitle("Add Note");
      }
      else if(location.pathname == "/todolist/view")
      {
        setTitle("View Note");
      }
      else if(location.pathname == "/todolist/edit")
      {
        setTitle("Edit Note");
       
        setInitialValues({
          title: location.state.title,
          description: location.state.description
        });

      }
      setSpinner(false);
      setDisplay(true);
    }, []);


    const saveNoteHandler = (e) => {

      try {

         setSpinner(true);

          const headers = {
            'Content-Type': 'application/json',
            'auth': token
          }
          
          const body = {
            title: e.title,
            description: e.description
          };

          if( location.pathname == "/todolist/edit" ) 
          {
            
            body.note_id = location.state._id;
            
            console.log('State is ', location.state);

            axios.put(`http://localhost:3001/todolist/${user.id}`, body, {headers} )
            .then((response) => {
              // console.log(response.data);
              history.replace({pathname: "/todolist/view", state:body })

            })
            .catch((error) => {
              
            })
          }
          else 
          { 
            axios.post(`http://localhost:3001/todolist/${user.id}`, body, {
              headers: headers
            })
            .then((response) => {
              // console.log(response.data);
              history.replace({pathname: "/todolist/view", state:body })

            })
            .catch((error) => {
              
            })
          }
      } catch (err) {
        console.log('Error comes');
      }
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
               
               <h1> {title}</h1>
               <Grid item xs={12}>
                  <Paper className={classes.paper}>

                { spinner && <LinearProgress /> }
                { display ? 

                
                  <Formik
                    validationSchema={schema}
                    initialValues={initialValues} 
                    onSubmit={(values)=> saveNoteHandler(values)}
                    
                  >
                    { ({ values, touched, errors, handleChange, isSubmitting, }) => {
                        return (
                            <Form>
                              <TextField 
                                id="standard-basic" 
                                label="Title" 
                                value={values.title}
                                style = {{width: "500px"}}
                                onChange={handleChange("title")}
                              /> <br/> <br/>

                              <p> {touched.title && errors.title ? errors.title: ""}</p> 

                              <TextareaAutosize 
                                label="Description" 
                                aria-label="minimum height" 
                                minRows={8} 
                                style = {{width: "500px"}}
                                placeholder="Description" 
                                value={values.description}
                                onChange={handleChange("description")}
                              /> <br/> <br/>
                               <p> {touched.description && errors.description ? errors.description: ""}</p>

                              <Button 
                                variant="contained" 
                                color="primary" 
                                type = "submit"
                              >  
                               Save  
                              </Button>

                              <Button 
                                variant="contained" 
                                color="secondary" 
                                onClick={ () => history.replace("/todolist", "/todolist/add") }
                              >  
                                Cancel  
                              </Button> 
                            </Form>
                        )
                    }}
                  </Formik>

                    : <> </>
                  }
                  </Paper>
               </Grid>
              

           </Grid>
           

        </div>
    )
}

export default FormComponent;