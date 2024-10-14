import React from "react";

export function Header({addTask}: { addTask: (task: string) => void }) {
    return <div className="todo-header">
        <input type="text" placeholder="Enter task name" onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>)=>{
            // user press enter
            if (event.key === 'Enter') {
                const task = event.currentTarget.value.trim();
                if (task) {
                    addTask(task);
                    event.currentTarget.value = '';
                }
            }
        }}/>
    </div>;
}