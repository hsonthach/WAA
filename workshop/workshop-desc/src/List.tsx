import {Item} from "./Item";
import React from "react";
import {Task} from "./Task";

interface ListProps {
    tasks: Task[],
    deleteTask: (index: number) => void
}

export function List({tasks, deleteTask}: ListProps) {
    return <ul className="todo-main">
        {tasks.map((task, index) => <Item key={index} name={task.name} deleteTask={deleteTask} id={task.id}/>)}
    </ul>;
}