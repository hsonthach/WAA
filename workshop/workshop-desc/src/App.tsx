import React from 'react';
import './App.css';
import {Header} from "./Header";
import {Footer} from "./Footer";
import {List} from "./List";
import {Task} from "./Task";


function App() {
    const [tasks, setTasks] = React.useState<Task[]>([
        {name: 'task1', done: false, id: 0},
        {name: 'task2', done: true, id: 1},
    ]);

    const addTask = (taskName: string) => {
        const task: Task = {
            name: taskName,
            done: false,
            id: tasks.length + 1
        };
        setTasks([...tasks, task]);
    }

    const deleteTask = (index: number) => {
        const newTasks = tasks.filter((task) => task.id !== index);
        setTasks(newTasks);
    }
    console.log(tasks)
    return (
        <div className="App">
            <div className="todo-container">
                <div className="todo-wrap">
                    <Header  addTask={addTask}/>
                    <List tasks={tasks} deleteTask={deleteTask} />
                    <Footer/>
                </div>
            </div>
        </div>

    );
}

export default App;
