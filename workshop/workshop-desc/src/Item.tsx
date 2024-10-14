import React from "react";

interface ItemProps {
    name: string,
    deleteTask: (id: number) => void,
    id: number
}

export function Item({name, deleteTask, id}: ItemProps) {
    return <li>
        <label>
            <input type="checkbox"/>
            <span>{name}</span>
        </label>
        <button className="btn btn-danger" onClick={()=>{
            // delete task
            deleteTask(id);
        }}>Delete</button>
    </li>;
}