import React from "react";

interface ItemProps {
    name: string,
    deleteTask: (id: number) => void,
    id: number,
    done: boolean,
    changeTaskStatus: (id: number, done: boolean) => void
}

export function Item({name, deleteTask, id, done, changeTaskStatus}: ItemProps) {
    return <li>
        <label>
            <input type="checkbox" checked={done} onChange={(event)=>{
                // change task status
                changeTaskStatus(id, event.target.checked);
            }}/>
            <span>{name}</span>
        </label>
        <button className="btn btn-danger btn-delete" onClick={() => {
            // delete task
            deleteTask(id);
        }}>Delete
        </button>
    </li>;
}