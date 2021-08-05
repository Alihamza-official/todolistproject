import React , { useContext , useState } from 'react';
import {useLocation} from 'react-router-dom';
import { useHistory } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
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
  email: yup.string().required("Email is required "),
  password: yup.string().required("Password is required ")
  
});

export default function SignIn() {
  const classes = useStyles();

  const [type, setType] = useState("");
  const { token , setToken } = useContext(RootContext);
  const { user , setUser } = useContext(RootContext);
  const initialValues = { email: "", password: ""};

  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  const location = useLocation();
  const history = useHistory();

  const LoginHandler = (email, password) => {
    // console.log(email,' ', password);

    axios.post("http://localhost:3001/users/login", {email, password})
        .then((response) => {
          let res = response.data;
          setOpen(false);

          if(res.found == true)
          {
            setUser(res.user);
            setToken(res.token);

            history.replace({pathname: "/todolist" })
          }

          // not found
          else if (res.found == false)
          {
            
            setMessage("Invalid username or password ");
            setOpen(true);
          }
      
        })
        .catch((error) => {
          
        })

  }
  return (

    <>

    {
      open ? 
        <> 
          <SnackbarProvider maxSnack={3}>
            <MyApp message={message} />
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
          Sign in
        </Typography>

        
        <Formik
            validationSchema={schema}
            initialValues={initialValues} 
            onSubmit={({email, password})=> LoginHandler(email, password)}
                    
            >
            { ({ values, touched, errors, handleChange, isSubmitting, }) => {
            return (

            <Form className={classes.form} >
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Enter Email"
                type= "email"
                value={values.email}
                onChange={handleChange("email")}
              />
              <p> {errors.email } </p>
               {/* <p> {touched.email && errors.email ? errors.email: ""}</p>  */}

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
             
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                
              >
                Sign In
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