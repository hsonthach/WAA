import {Todo} from "../features/todo/todoSlice";
import {PayloadAction} from "@reduxjs/toolkit";
import React from "react";

export function TodoCard(props: {
    todo: Todo,
    toggleTodo: () => PayloadAction<number, "todo/toggleTodo">,
    removeTodo: () => PayloadAction<number, "todo/removeTodo">
}) {
    return <>
              <span
                  className={`flex-1 ${props.todo.completed ? "line-through" : ""}`}
                  onClick={props.toggleTodo}
              >
                {props.todo.text}
              </span>
        <button
            className="bg-blue-500 text-white p-1 px-3 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mr-3">
            Edit
        </button>
        <button
            onClick={props.removeTodo}
            className="bg-red-500 text-white p-1 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
            Remove
        </button>
    </>;
}