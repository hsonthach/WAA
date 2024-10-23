import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Todo {
  id: number;
  name: string;
  completed: boolean;
  description?: string;
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

// Async thunk for updating a todo
export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async (updatedTodo: Todo) => {
    const response = await axios.patch(
      `${baseUrl}/${updatedTodo.id}`,
      updatedTodo
    );
    return response.data;
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

    return id; // Return the id of the deleted todo
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
      .addCase(updateTodo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.todos.findIndex(
          (todo) => todo.id === action.payload.id
        );
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
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
