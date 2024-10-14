import React from "react";

interface FooterProps {
    numerOfFinishTasked: number,
    totalTasks: number
}

export function Footer({numerOfFinishTasked, totalTasks}: FooterProps) {
    return <div className="todo-footer">
        <label>
            <input type="checkbox"/>
        </label>
        <span>
          <span>Finished {numerOfFinishTasked}</span> / total {totalTasks}
        </span>
        <button className="btn btn-danger">Delete Finished Tasks</button>
    </div>;
}