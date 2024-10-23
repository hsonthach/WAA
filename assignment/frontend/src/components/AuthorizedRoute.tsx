import React, {ReactNode} from 'react';
import {Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {RootState} from "../app/store"; // Assuming you're using Redux for authentication

// AuthorizedRoute component
const AuthorizedRoute = ({children}: { children: ReactNode }) => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    // console.log('isAuthenticated: ', isAuthenticated);
    return isAuthenticated ? <>{children}</> : <Navigate to="/login"/>;
};

export default AuthorizedRoute;
