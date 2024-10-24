import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../../types/Todo";
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "../../service/todo.service";

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
  size: 10,
  totalPage: 0,
  status: "idle",
  error: null,
};

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
