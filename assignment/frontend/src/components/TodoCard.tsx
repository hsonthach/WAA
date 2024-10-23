import React from "react";
import {Todo} from "../types/Todo";
import { EditTodo } from "./EditTodo";

export function TodoCard(props: { todo: Todo; removeTodo: () => void }) {
  const [editting, setEditting] = React.useState(false);
  return (
    <div className="p-4 bg-white rounded-lg shadow-lg w-full max-w-lg">
      <div>
        <h3 className="text-xl font-bold">{props.todo.name}</h3>
        <p className="text-gray-500 truncate">{props.todo.description}</p>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          onClick={() => setEditting(true)}
          className="bg-blue-500 text-white p-1 px-3 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mr-3"
        >
          Edit
        </button>
        <button
          onClick={props.removeTodo}
          className="bg-red-500 text-white p-1 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Remove
        </button>
      </div>
      {editting && <EditTodo todo={props.todo} setEditting={setEditting} />}
    </div>
  );
}
