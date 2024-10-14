import React, {useState} from "react";

interface FooterProps {
    numerOfFinishTasked: number,
    totalTasks: number,
    deleteFinishedTask: () => void,
    setAllTaskChecked: (checked: boolean) => void,
    allTaskChecked: boolean,
}

export function Footer({
                           numerOfFinishTasked,
                           totalTasks,
                           deleteFinishedTask,
                           allTaskChecked,
                           setAllTaskChecked
                       }: FooterProps) {
    return <div className="todo-footer">
        <label>
            <input type="checkbox" checked={allTaskChecked} onChange={(event) => {
                setAllTaskChecked(event.target.checked);
                setAllTaskChecked(event.target.checked);
            }}/>
        </label>
        <span>
          <span>Finished {numerOfFinishTasked}</span> / total {totalTasks}
        </span>
        <button className="btn btn-danger" onClick={() => deleteFinishedTask()}>Delete Finished Tasks</button>
    </div>;
}