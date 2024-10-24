import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {Navigate, Route, Routes} from "react-router-dom";

import {RootState} from "./state/store";
import {loginSuccess} from "./state/reducer/authSlice";
import AuthorizedRoute from "./components/AuthorizedRoute";
import LoginPage from "./pages/LoginPage";

import "./App.css";
import TodoList from "./pages/TodoList";
import TodoCreate from "./pages/TodoCreate";
import TodoView from "./pages/TodoView";
import TodoPage from "./pages/TodoPage";

const AppWrapper = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(
        (state: RootState) => state.auth.isAuthenticated
    );

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        const email = localStorage.getItem("todoAppEmail") || "";
        if (token) {
            // If token exists, dispatch login success and set the token for future API requests
            dispatch(loginSuccess({token, email}));
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
    }, [dispatch]);

    return (
        <Routes>
            <Route path="/" element={<Navigate to="/todos"/>}/>
            <Route
                path="/login"
                element={isAuthenticated ? <Navigate to="/todos"/> : <LoginPage/>}
            />

            <Route path="/todos" element={
                <AuthorizedRoute>
                    <TodoPage/>
                </AuthorizedRoute>
            }>
                <Route
                    path=""
                    element={
                        <AuthorizedRoute>
                            <TodoList/>
                        </AuthorizedRoute>
                    }
                />
                <Route
                    path="create"
                    element={
                        <AuthorizedRoute>
                            <TodoCreate/>
                        </AuthorizedRoute>
                    }
                />
                <Route
                    path=":id"
                    element={
                        <AuthorizedRoute>
                            <TodoView/>
                        </AuthorizedRoute>
                    }
                />
            </Route>
        </Routes>
    );
};

export default AppWrapper;
