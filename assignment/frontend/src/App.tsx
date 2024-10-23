import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './app/store';
import {addTodo, toggleTodo, removeTodo, setTodos} from './features/todo/todoSlice';
import './App.css';
import {createTodoApi, fetchTodosFromApi} from './service/todoService'
import {loginUser, setAuthToken} from './service/authService'
import Todo from "./Todo";

const App: React.FC = () => {
  const [text, setText] = useState('');
  const todos = useSelector((state: RootState) => state.todo.todos);
  const dispatch = useDispatch();

    useEffect(() => {
        const loadData = async () => {
            try {
                const fetchedTodos = await fetchTodosFromApi();
                dispatch(setTodos(fetchedTodos));
            } catch (err) {
                console.error('Failed to fetch data:', err);
            }
        };

        loadData();
    }, [dispatch]);

  const handleAddTodo = async () => {
      try {
          if (text.trim()) {
              const newTodo: Todo = await createTodoApi(text);
              dispatch(addTodo(newTodo)); // Dispatch sync action to add a todo
              setText('');
          }
      } catch (error) {
          console.error('Failed to add todo:', error);
      }
  };

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
            <span
              className={`flex-1 ${todo.completed ? 'line-through' : ''}`}
              onClick={() => dispatch(toggleTodo(todo.id))}
            >
              {todo.text}
            </span>
            <button
              onClick={() => dispatch(removeTodo(todo.id))}
              className="bg-red-500 text-white p-1 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;