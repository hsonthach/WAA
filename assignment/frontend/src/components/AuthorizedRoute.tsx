import React, {ReactNode} from 'react';
import {Route, Navigate, PathRouteProps, LayoutRouteProps, IndexRouteProps, Outlet} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {RootState} from "../app/store"; // Assuming you're using Redux for authentication

type RouteProps = PathRouteProps | LayoutRouteProps | IndexRouteProps;

// interface AuthorizedRouteProps extends RouteProps {
//     // component: ComponentType<any>;
//     element: JSX.Element;
//     path: string;
// }

// AuthorizedRoute component
const AuthorizedRoute = ({children}: { children: ReactNode }) => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    console.log('isAuthenticated: ', isAuthenticated);
    return isAuthenticated ? <>{children}</> : <Navigate to="/login"/>;

    // return (
    //     <Route
    //         {...rest}
    //         // @ts-ignore
    //         render={(props: RouteProps) =>
    //             isAuthenticated ?
    //                 // (<Component {...props} />)
    //                 element
    //                 : (
    //                     <Navigate to="/login"/> // Redirect to login if not authenticated
    //                 )
    //         }
    //     />
    // );
};

export default AuthorizedRoute;
