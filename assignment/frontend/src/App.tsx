import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from './app/store';
import {addTodo, removeTodo, toggleTodo} from './features/todo/todoSlice';
import './App.css';
import {TodoCard} from "./components/TodoCard";

const App: React.FC = () => {
  const [text, setText] = useState('');
  const todos = useSelector((state: RootState) => state.todo.todos);
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (text.trim()) {
      dispatch(addTodo(text));
      setText('');
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
              <TodoCard todo={todo} toggleTodo={() => dispatch(toggleTodo(todo.id))}
                        removeTodo={() => dispatch(removeTodo(todo.id))}/>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;