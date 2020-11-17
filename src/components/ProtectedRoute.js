import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getUser } from "../services/auth";

const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => {
                if (!getUser()) return <Redirect to="/login" />;
                return Component ? <Component {...props} /> : render(props);
            }}
        />
    );
};

export default ProtectedRoute;