import {Todo} from "../features/todo/todoSlice";
import {PayloadAction} from "@reduxjs/toolkit";
import React from "react";

interface EditTodoProps {
    todo: Todo
}

function EditTodo({todo}: EditTodoProps) {
    // edit name and description
    return <div>
        <input type="text" placeholder="Name" defaultValue={todo.text}/>
        <input type="text" placeholder="Description" defaultValue={todo.description}/>
        <button
            className="bg-blue-500 text-white p-1 px-3 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mr-3">
            Save
        </button>
        <button
            className="bg-red-500 text-white p-1 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
            Cancel
        </button>
    </div>;
}

export function TodoCard(props: {
    todo: Todo,
    removeTodo: () => PayloadAction<number, "todo/removeTodo">
}) {
    const [editting, setEditting] = React.useState(false);
    if (editting) {
        return <EditTodo todo={props.todo}/>
    }
    return <>
        <div>
            <h3>{props.todo.text}</h3>
        </div>
        <div>
            <button
                onClick={() => setEditting(true)}
                className="bg-blue-500 text-white p-1 px-3 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mr-3">
                Edit
            </button>
            <button
                onClick={props.removeTodo}
                className="bg-red-500 text-white p-1 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
                Remove
            </button>
        </div>
    </>
}