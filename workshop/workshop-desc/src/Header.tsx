import React from "react";

export function Header({addTask}: { addTask: (task: string) => void }) {
    return <div className="todo-header">
        <input type="text" placeholder="Enter task name" onKeyDown={(event)=>{
            // user press enter
            if (event.key === 'Enter') {
                const task = (event.target as HTMLInputElement).value;
                addTask(task);
                (event.target as HTMLInputElement).value = ''; // clear the input
            }
        }}/>
    </div>;
}