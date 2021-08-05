
import React, {useContext} from "react";
import { Route, Redirect } from "react-router-dom";

import { RootContext} from "../Context/RootContext";
import { useHistory } from "react-router-dom";

const ProtectedRoute = ({ children, render, ...routeProps}) => {
   
    const {token} = useContext(RootContext);
    const history = useHistory();

    return (
        <Route
            {...routeProps}
            render = {() => {
                if (token) {
                    return render || children;
                }
                else {
                    history.replace({pathname: "/login"}); 

                    return <Redirect to= {{ pathname: "/login" }} />; // note: it's not working

                }
            }}
        />
    )
}

export default ProtectedRoute;