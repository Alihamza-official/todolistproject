
import Layout from './Hoc/Layout';
import React , {useState} from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import ProtectedRoute from './Hoc/ProtectedRoute';
import RootContext from './Context/RootContext';

import LoginComponent from './Containers/Login';
import Todolist from './Containers/Todolist/List';
import TodolistForm from './Containers/Todolist/Form';
import View from './Containers/Todolist/View';
import SignUpComponent from './Components/SignUp';

function App() {

  const [container, setContainer] = useState("todolist");

  return (

    <RootContext> 
      <BrowserRouter>

      <Switch>
          <Route path="/login" component = {LoginComponent} exact />
          <Route path="/signup" component = {SignUpComponent} exact />

          <div>
            <Layout 
              handleContainer = {(value) => setContainer(value)} 
              name = {container}
            >
              <ProtectedRoute  path="/todolist" exact>
                <Todolist/>
              </ProtectedRoute>

              <ProtectedRoute path="/todolist/add" exact>
                <TodolistForm/>
              </ProtectedRoute>

              <ProtectedRoute path="/todolist/view" exact>
                <View/>
              </ProtectedRoute>

              <ProtectedRoute path="/todolist/edit" exact>
                <TodolistForm/>
              </ProtectedRoute>

              <Redirect to= "/todolist" from="/" />
                  
            </Layout> 
          </div>
        </Switch>
      </BrowserRouter>
     
    </RootContext>
  ); 
}

export default App;
