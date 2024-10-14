import React from "react";

interface FooterProps {
    numerOfFinishTasked: number,
    totalTasks: number,
    deleteFinishedTask: () => void
}

export function Footer({numerOfFinishTasked, totalTasks, deleteFinishedTask}: FooterProps) {
    return <div className="todo-footer">
        <label>
            <input type="checkbox"/>
        </label>
        <span>
          <span>Finished {numerOfFinishTasked}</span> / total {totalTasks}
        </span>
        <button className="btn btn-danger" onClick={()=>deleteFinishedTask()}>Delete Finished Tasks</button>
    </div>;
}