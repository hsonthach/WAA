import React, {ComponentType} from 'react';
import {Route, Navigate, RouteProps} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {RootState} from "../app/store"; // Assuming you're using Redux for authentication

// @ts-ignore
interface AuthorizedRouteProps extends RouteProps {
    component: ComponentType<any>;
}

// AuthorizedRoute component
const AuthorizedRoute = ({component: Component, ...rest}: AuthorizedRouteProps) => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    return (
        <Route
            {...rest}
            // @ts-ignore
            render={(props: RouteProps) =>
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Navigate to="/login"/> // Redirect to login if not authenticated
                )
            }
        />
    );
};

export default AuthorizedRoute;
