import React, {useEffect, useState, MouseEvent} from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import {RootState, useAppDispatch} from "./app/store";
import {
    getTodos,
    clearTodo,
    createTodo,
    deleteTodo,
} from "./features/todo/todoSlice";
import {TodoCard} from "./components/TodoCard";
import {loginSuccess, logout} from "./features/auth/authSlice";
import AuthorizedRoute from "./components/AuthorizedRoute";
import "./App.css";
import LoginView from "./features/auth/LoginView";
import Users from "./features/user/Users";

const App: React.FC = () => {
    const [text, setText] = useState("");
    const {todos, page, size, totalPage, status} = useSelector(
        (state: RootState) => state.todo
    );
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {email: currentUser} = useSelector((state: RootState) => state.auth);

    const handleAddTodo = async () => {
        try {
            if (text.trim()) {
                dispatch(createTodo(text)); // Dispatch sync action to add a todo
                setText("");
            }
        } catch (error) {
            console.error("Failed to add todo:", error);
        }
    };

    const handleOnSignOutBtnClick = (e: MouseEvent<HTMLButtonElement>) => {
        dispatch(logout());
        // Optionally save to localStorage or sessionStorage for persistence
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('todoAppEmail');

        // Add token to Axios common headers for future requests
        delete axios.defaults.headers.common['Authorization'];

        // Redirect to the main page
        navigate('/');
    }

    useEffect(() => {
        dispatch(getTodos({page: page, size, isInit: true}));
        return () => {
            dispatch(clearTodo());
        };
    }, []);

    return (
        <>
            <nav className="bg-gray-800">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            <button type="button"
                                    className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                    aria-controls="mobile-menu" aria-expanded="false">
                                <span className="absolute -inset-0.5"></span>
                                <span className="sr-only">Open main menu</span>
                                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                     stroke="currentColor" aria-hidden="true" data-slot="icon">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
                                </svg>
                                <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                     stroke="currentColor" aria-hidden="true" data-slot="icon">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/>
                                </svg>
                            </button>
                        </div>
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex flex-shrink-0 items-center">
                                <img className="h-8 w-auto"
                                     src="https://tailwindui.com/plus/img/logos/mark.svg?color=blue&shade=500"
                                     alt="Your Company"/>
                            </div>
                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                    <a href="/"
                                       className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                                       aria-current="page">Todos</a>
                                    {/*<a href="/users"*/}
                                    {/*   className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Users</a>*/}
                                </div>
                            </div>
                        </div>
                        <div
                            className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <button type="button"
                                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                <span className="absolute -inset-1.5"></span>
                                <span className="sr-only">View notifications</span>
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                     stroke="currentColor" aria-hidden="true" data-slot="icon">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"/>
                                </svg>
                            </button>

                            <div className="relative ml-3">
                                <div>
                                    <button type="button"
                                            className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                            id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                        <span className="absolute -inset-1.5"></span>
                                        <span className="sr-only">Open user menu</span>
                                        <img className="h-8 w-8 rounded-full"
                                             src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                             alt=""/>
                                    </button>
                                </div>
                                <div
                                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                    role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button"
                                >
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem"
                                       id="user-menu-item-0">{currentUser}</a>

                                    <button
                                        onClick={handleOnSignOutBtnClick}
                                        className="block px-4 py-2 text-sm text-gray-700"
                                    >
                                        Sign out
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="App min-h-screen bg-gray-100 flex flex-col items-center p-4">
                <h1 className="text-3xl font-bold mb-4">Todo List</h1>
                <div className="flex mb-4">
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="border border-gray-300 p-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleAddTodo}
                        className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Add Todo
                    </button>
                </div>
                <ul className="w-full max-w-md">
                    {todos.map((todo) => (
                        <li
                            key={todo.id}
                            className="flex justify-between items-center bg-white p-2 mb-2 rounded shadow"
                        >
                            <TodoCard
                                todo={todo}
                                removeTodo={() => dispatch(deleteTodo(todo.id))}
                            />
                        </li>
                    ))}
                    {status === "succeeded" && page < totalPage && (
                        <button
                            onClick={() => {
                                dispatch(getTodos({page: page + 1, size}));
                            }}
                        >
                            Load more
                        </button>
                    )}
                </ul>
            </div>
        </>
    );
};

const AppWrapper = () => {
    // const dispatch = useDispatch();
    const dispatch = useAppDispatch();
    const isAuthenticated = useSelector(
        (state: RootState) => state.auth.isAuthenticated
    );

    // Check if token exists when the app starts
    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        const email = localStorage.getItem("todoAppEmail") || '';
        // console.log("localStorage data: ", token, email);
        if (token) {
            // If token exists, dispatch login success and set the token for future API requests
            dispatch(loginSuccess({token, email}));
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
    }, [dispatch]);

    return (
        <Routes>
            {/* Redirect to main page if already authenticated */}
            <Route
                path="/login"
                element={isAuthenticated ? <Navigate to="/"/> : <LoginView/>}
            />

            {/* Protected route */}
            <Route
                path="/"
                element={
                    <AuthorizedRoute>
                        <App/>
                    </AuthorizedRoute>
                }
            />
            <Route
                path="/users"
                // element={<h1>User List</h1>}
                // element={<Users/>}
                element={
                    <AuthorizedRoute>
                        <Users/>
                    </AuthorizedRoute>
                }
            />

            {/* Other routes can be added here */}
        </Routes>
    );
};

export default AppWrapper;