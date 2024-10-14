import React, {useEffect} from 'react';
import './App.css';
import {Header} from "./Header";
import {Footer} from "./Footer";
import {List} from "./List";
import {Task} from "./Task";


function App() {
    const [tasks, setTasks] = React.useState<Task[]>([]);
    const [allTaskChecked, setAllTaskChecked] = React.useState<boolean>(false);

    useEffect(() => {
        fetch('http://localhost:3000/tasks').then((response) => {
            return response.json();
        }).then((data) => {
            setTasks(data);
        })
    },[])

    useEffect(() => {
        // update allTaskChecked if all tasks are checked
        const checked = tasks.every((task) => task.done);
        setAllTaskChecked(checked);
    }, [tasks]);


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
                    <Header addTask={addTask}/>
                    <List tasks={tasks} deleteTask={deleteTask} changeTaskStatus={changeTaskStatus} />
                    <Footer numerOfFinishTasked={finishedTask.length}  totalTasks={tasks.length} deleteFinishedTask={deleteFinishedTask}  allTaskChecked={allTaskChecked} setAllTaskChecked={(checked)=>{
                        setAllTaskChecked(checked);
                        const newTasks = tasks.map((task) => {
                            return {
                                ...task,
                                done: checked
                            }
                        });
                        setTasks(newTasks);
                    }}/>
                </div>
            </div>
        </div>

    );
}

export default App;
