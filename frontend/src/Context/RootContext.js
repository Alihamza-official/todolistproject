import React, {useState, useEffect } from 'react';

export const RootContext = React.createContext(); //consumer

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ children }) => {
    
    // const preAuth = JSON.parse(window.localStorage.getItem('token')) || false;
    // const preUser = JSON.parse(window.localStorage.getItem('user')) || null;

    const preAuth = false;
    const preUser = null;

    const [token, setToken] = useState(preAuth);
    const [user, setUser] = useState(preUser);
    const [ notes, setNotes ] = useState([]);

    useEffect ( () => {
        if(!token)  window.localStorage.clear();
        else window.localStorage.setItem('token', token);

        if(!user)  window.localStorage.clear();
        else window.localStorage.setItem('user', JSON.stringify(user));
        
        console.log("Updating state called");
    }, [token, user]);

    const defaultValues  = {
        token,
        setToken,
        user,
        setUser,
        notes,
        setNotes
    };

    return (
        <RootContext.Provider value={defaultValues} > 
            { children } 
        </RootContext.Provider>
    );
};