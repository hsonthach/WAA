import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Navigate, Route, Routes } from "react-router-dom";
import { RootState, useAppDispatch } from "./app/store";
import {
  addTodo,
  getTodos,
  removeTodo,
  Todo,
  clearTodo,
  deleteTodo,
} from "./features/todo/todoSlice";
import { TodoCard } from "./components/TodoCard";
import { createTodoApi } from "./service/todoService";
import { loginSuccess } from "./features/auth/authSlice";
import AuthorizedRoute from "./components/AuthorizedRoute";
import "./App.css";
import LoginView from "./features/auth/loginView";

const App: React.FC = () => {
  const [text, setText] = useState("");
  const { todos, page, size, totalPage, status } = useSelector(
    (state: RootState) => state.todo
  );
  const dispatch = useAppDispatch();

  const handleAddTodo = async () => {
    try {
      if (text.trim()) {
        const newTodo: Todo = await createTodoApi(text);
        dispatch(addTodo(newTodo)); // Dispatch sync action to add a todo
        setText("");
      }
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  };

  useEffect(() => {
    dispatch(getTodos({ page: page, size, isInit: true }));
    return () => {
      dispatch(clearTodo());
    };
  }, []);

  return (
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
              dispatch(getTodos({ page: page + 1, size }));
            }}
          >
            Load more
          </button>
        )}
      </ul>
    </div>
  );
};

const AppWrapper = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  // Check if token exists when the app starts
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    console.log("token: ", token);
    if (token) {
      // If token exists, dispatch login success and set the token for future API requests
      dispatch(loginSuccess(token));
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, [dispatch]);

  return (
    <Routes>
      {/* Redirect to main page if already authenticated */}
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" /> : <LoginView />}
      />

      {/* Protected route */}
      <Route
        path="/"
        element={
          <AuthorizedRoute>
            <App />
          </AuthorizedRoute>
        }
      />

      {/* Other routes can be added here */}
    </Routes>
  );
};

export default AppWrapper;
