import React from "react";

export function Item({name}: { name: string }) {
    return <li>
        <label>
            <input type="checkbox"/>
            <span>{name}</span>
        </label>
        <button className="btn btn-danger">Delete</button>
    </li>;
}