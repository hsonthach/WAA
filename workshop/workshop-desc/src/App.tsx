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
    const finishedTask = tasks.filter((task) => task.done);

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

    const changeTaskStatus = (id: number, done: boolean) => {
        const newTasks = tasks.map((task) => {
            if (task.id === id) {
                return {
                    ...task,
                    done: done
                }
            }
            return task;
        });
        setTasks(newTasks);
    }

    const deleteFinishedTask = () => {
        const newTasks = tasks.filter((task) => !task.done);
        setTasks(newTasks);
    }
    return (
        <div className="App">
            <div className="todo-container">
                <div className="todo-wrap">
                    <Header  addTask={addTask}/>
                    <List tasks={tasks} deleteTask={deleteTask} changeTaskStatus={changeTaskStatus} />
                    <Footer numerOfFinishTasked={finishedTask.length}  totalTasks={tasks.length} deleteFinishedTask={deleteFinishedTask}/>
                </div>
            </div>
        </div>

    );
}

export default App;
