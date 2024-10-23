import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  description?: string;
}

interface TodoState {
  todos: Todo[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TodoState = {
  todos: [],
  status: 'idle',
  error: null,
};

// Async thunk for updating a todo
export const updateTodo = createAsyncThunk(
  'todos/updateTodo',
  async (updatedTodo: Todo) => {
    const response = await axios.patch(`http://localhost:8080/todos/${updatedTodo.id}`, updatedTodo, {
        headers: {
            // Authorization: `Bearer ${sampleToken}`
        }
    })
    return response.data;
  }
);

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateTodo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.todos.findIndex(todo => todo.id === action.payload.id);
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to update todo';
      });
  },
});

export const { addTodo, toggleTodo, removeTodo } = todoSlice.actions;
export default todoSlice.reducer;