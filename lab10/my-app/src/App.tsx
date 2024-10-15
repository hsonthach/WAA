import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import axios from "axios";
import {UserCard} from "./UserCard";

interface User {
    id: string;
    name: string;
    avatar_url: string;
    profileUrl: string;
}


function App() {
    const [key, setKey] = useState("");
    const [users, setUsers] = useState<User[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (!key) return;
        axios.get(`https://api.github.com/search/users?q=${key}`).then(res => {
            console.log(res.data);
            const users = res.data.items.map((item: any) => {
                return {
                    name: item.login,
                    avatar_url: item.avatar_url,
                    profileUrl: item.html_url,
                    id: item.id
                }
            })
            setUsers(users);
        })
    }, [key]);
    return (
        <div className="App">
            <div className="container">
                <section className="jumbotron">
                    <h3 className="jumbotron-heading">Search Github Users</h3>
                    <div>
                        <input type="text" placeholder="enter the name you search" ref={inputRef} />&nbsp;
                        <button onClick={()=>{
                            setKey(inputRef.current?.value || "");
                        }}>Search</button>
                    </div>
                </section>
                <div className="row">
                    {users.map(user => <UserCard key={user.id} name={user.name} avatar={user.avatar_url} profileUrl={user.profileUrl}/>)}
                </div>
            </div>
        </div>
    );
}

export default App;