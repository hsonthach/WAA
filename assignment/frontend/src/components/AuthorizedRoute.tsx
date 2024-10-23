import React, {ReactElement, ReactNode} from 'react';
import {Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {RootState} from "../app/store"; // Assuming you're using Redux for authentication

// AuthorizedRoute component
const AuthorizedRoute = ({children}: { children: ReactNode | ReactElement }) => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    // console.log('isAuthenticated: ', isAuthenticated);
    // console.log('children: ', children);
    console.log('Route being accessed:', window.location.pathname);
    return isAuthenticated ? <>{children}</> : <Navigate to="/login"/>;
};

export default AuthorizedRoute;
