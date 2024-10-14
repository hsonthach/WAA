import React from 'react';
import logo from './logo.svg';
import './App.css';

function Header() {
    return <div className="todo-header">
        <input type="text" placeholder="Enter task name"/>
    </div>;
}

function Item() {
    return <li>
        <label>
            <input type="checkbox"/>
            <span>xxxxx</span>
        </label>
        <button className="btn btn-danger">Delete</button>
    </li>;
}

function Footer() {
    return <div className="todo-footer">
        <label>
            <input type="checkbox"/>
        </label>
        <span>
          <span>Finished 0</span> / total 2
        </span>
        <button className="btn btn-danger">Delete Finished Tasks</button>
    </div>;
}

function List() {
    return <ul className="todo-main">
        <Item/>
        <Item/>
    </ul>;
}

function App() {
    return (
        <div className="App">
            <div className="todo-container">
                <div className="todo-wrap">
                    <Header/>
                    <List/>
                    <Footer/>
                </div>
            </div>
        </div>

    );
}

export default App;
