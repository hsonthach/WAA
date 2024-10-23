import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Todo {
  id: number;
  name: string;
  completed: boolean;
  description: string;
}

export interface GetTodoParam {
  page: number;
  size: number;
  isInit?: boolean;
}

export interface GetTodoResponse {
  totalPage: number;
  data: Todo[];
}

interface TodoState {
  todos: Todo[];
  page: number;
  size: number;
  totalPage: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: TodoState = {
  todos: [],
  page: 0,
  size: 2,
  totalPage: 0,
  status: "idle",
  error: null,
};

const baseUrl = "http://localhost:8080/todos";
const getHeaders = () => {
  const token = localStorage.getItem("jwtToken");
  console.log("Token used in headers:", token);
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const createTodo = createAsyncThunk<Todo, string>(
  "todos/createTodo",
  async (text: string): Promise<Todo> => {
    try {
      // Perform the POST request using Axios
      const response = await axios.post(
        `${baseUrl}`,
        { name: text },
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
  }
);

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

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    clearTodo: (state) => {
      state.todos = [];
      console.log("Removed");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTodo.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.status = "succeeded";
        state.todos.push(action.payload);
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to create todo";
      });

    builder
      .addCase(updateTodo.pending, (state, action) => {
        state.status = "loading";
        // update todo right away
        const { id, name, description } = action.meta.arg;
        const todo = state.todos.find((todo) => todo.id === id);
        if (todo) {
          todo.name = name;
          todo.description = description;
        }
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to update todo";
      });

    builder
      .addCase(getTodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.meta.arg.isInit) state.todos = action.payload.data;
        else state.todos = [...state.todos, ...action.payload.data];

        state.totalPage = action.payload.totalPage;
        state.page = action.meta.arg.page;
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to get todos";
      });

    builder
      .addCase(deleteTodo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to delete todo";
      });
  },
});

export const { addTodo, toggleTodo, removeTodo, clearTodo } = todoSlice.actions;
export default todoSlice.reducer;
