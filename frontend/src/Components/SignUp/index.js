
import React , { useContext , useState } from 'react';
import {useLocation} from 'react-router-dom';
import { useHistory } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { RootContext } from '../../Context/RootContext';

import { SnackbarProvider, useSnackbar } from 'notistack';
import MyApp from '../../Components/Alerts';

import * as yup from 'yup';
import { Formik, Form } from "formik";
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

let schema = yup.object().shape({
  name: yup.string().required("Name is required "),
  email: yup.string().required("Email is required "),
  password: yup.string().required("Password is required ")
  
});

export default function SignUp() {
  const classes = useStyles();

  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  const { token , setToken } = useContext(RootContext);
  const { user , setUser } = useContext(RootContext);
  const initialValues = { name: "", email: "", password: ""};

  const location = useLocation();
  const history = useHistory();

  const LoginHandler = (name, email, password) => {
    // console.log(email,' ', password);

    console.log(name);
    axios.post("http://localhost:3001/users/register", {name, email, password})
        .then((response) => {
          let res = response.data;
          setOpen(false);

          // case: user already exits
          if(res.status == false)
          {
            console.log(res.message);
            setMessage("User already exists ");
            setOpen(true);

          }
          else if (res.status == true)
          {
            setUser(res.user);
            setToken(res.token);
            history.replace({pathname: "/login" });

          }
      
        })
        .catch((error) => {
          
        })

  }
  return (

    <>

    {
        open ? <>
          <SnackbarProvider maxSnack={3}>
            <MyApp message={message}  />
          </SnackbarProvider>
        </> : <> </> 
    }


    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>

        
        <Formik
            validationSchema={schema}
            initialValues={initialValues} 
            onSubmit={({name, email, password})=> LoginHandler(name, email, password)}
                    
            >
            { ({ values, touched, errors, handleChange, isSubmitting, }) => {
            return (

            <Form className={classes.form} >
                
             <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Enter Name"
                value={values.name}
                onChange={handleChange("name")}
              />
               <p> {errors.name } </p>

              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Enter Email"
                value={values.email}
                type= "email"
                onChange={handleChange("email")}
              />
               <p> {errors.email } </p>

              <TextField
                variant="outlined"
                margin="normal"
          
                fullWidth
                label="Enter Password"
                type="password"
               
                value={values.password}
                onChange={handleChange("password")}
              />
               <p> {errors.password } </p>
               
              <Button
                type="submit"
                style={{ float: "right" }}
                variant="contained"
                color="primary"
                className={classes.submit}
                
              >
                Sign Up
                
              </Button>

              <Button
                style={{ float: "left" }}
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick = { () => {
                  console.log('hello')
                  history.replace({pathname: "/login" });
                }}
              >
               Return
              </Button>

             
            </Form>
              )
            }}
          </Formik>

      </div>
      
    </Container>

    </>
  );
}