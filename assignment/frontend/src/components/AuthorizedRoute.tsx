import React, { ReactElement, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../state/store"; // Assuming you're using Redux for authentication

const AuthorizedRoute = ({
  children,
}: {
  children: ReactNode | ReactElement;
}) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  console.log(
    "Route being accessed:",
    window.location.pathname,
    isAuthenticated
  );
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export default AuthorizedRoute;
