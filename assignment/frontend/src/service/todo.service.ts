import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetTodoParam, GetTodoResponse, Todo } from "../types/Todo";
import axios from "axios";

const baseUrl = "http://localhost:8080/todos";
const getHeaders = () => {
  const token = localStorage.getItem("jwtToken");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const createTodo = createAsyncThunk<
  Todo,
  { name: string; description: string }
>("todos/createTodo", async (params): Promise<Todo> => {
  try {
    // Perform the POST request using Axios
    const response = await axios.post(
      `${baseUrl}`,
      { name: params.name, description: params.description },
      { headers: getHeaders() }
    );

    // Return the newly created Todo based on response data
    return {
      id: response.data.id,
      name: response.data.name,
      completed: response.data.completed,
      description: response.data.description,
    };
  } catch (error) {
    console.error("Error creating todo:", error);
    throw new Error("Failed to create todo");
  }
});

// Async thunk for updating a todo
export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async (updatedTodo: { id: number; name: string; description: string }) => {
    axios.patch(`${baseUrl}/${updatedTodo.id}`, updatedTodo);
    // update todo without waiting for response
    return updatedTodo;
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id: number) => {
    const token = localStorage.getItem("jwtToken");

    const response = await fetch(`${baseUrl}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete todo");
    }

    return id;
  }
);

export const getTodos = createAsyncThunk(
  "todos/getTodos",
  async (param: GetTodoParam): Promise<GetTodoResponse> => {
    const response = await axios.get(
      `${baseUrl}?page=${param.page || 0}&size=${param.size || 10}`
    );
    return response.data;
  }
);
