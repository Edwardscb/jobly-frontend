import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "./UserContext";

function ProtectedRoute({ exact, path, children }) {
    const { currentUser } = useContext(UserContext);
    console.debug("Protected Route", "currentUser=", currentUser)

    if (!currentUser) {
        return <Redirect to="/login" />;
    }

    return (
        <Route exact={exact} path={path}>{children}</Route>
    );
}

export default ProtectedRoute;