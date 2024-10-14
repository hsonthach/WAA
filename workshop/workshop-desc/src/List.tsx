import {Item} from "./Item";
import React from "react";

interface ListProps {
    tasks: {name: string, done: boolean}[];
}

export function List({tasks}: ListProps) {
    return <ul className="todo-main">
        {tasks.map((task, index) => <Item key={index} name={task.name}/>)}
    </ul>;
}