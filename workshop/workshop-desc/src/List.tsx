import {Item} from "./Item";
import React from "react";
import {Task} from "./Task";

interface ListProps {
    tasks: Task[],
    deleteTask: (index: number) => void,
    changeTaskStatus: (id: number, done: boolean) => void
}

export function List({tasks, deleteTask, changeTaskStatus}: ListProps) {
    return <ul className="todo-main">
        {tasks.map((task, index) => <Item key={index} name={task.name} deleteTask={deleteTask} id={task.id}
                                          done={task.done} changeTaskStatus={changeTaskStatus}/>)}
    </ul>;
}