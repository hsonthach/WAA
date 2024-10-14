import React from 'react';
import './App.css';
import {Header} from "./Header";
import {Footer} from "./Footer";
import {List} from "./List";


type Task =  {
    name: string;
    done: boolean;
}

function App() {
    const [tasks, setTasks] = React.useState<Task[]>([
        {name: 'task1', done: false},
        {name: 'task2', done: true}
    ]);

    const addTask = (taskName: string) => {
        const task: Task = {
            name: taskName,
            done: false
        };
        setTasks([...tasks, task]);
    }
    console.log(tasks)
    return (
        <div className="App">
            <div className="todo-container">
                <div className="todo-wrap">
                    <Header  addTask={addTask}/>
                    <List tasks={tasks}/>
                    <Footer/>
                </div>
            </div>
        </div>

    );
}

export default App;
