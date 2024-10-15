import React, {useEffect, useState} from 'react';
import './App.css';
import axios from "axios";

interface User {
    name: string;
    avatar_url: string;
    profileUrl: string;
}

interface UserCardProps {
    avatar: string,
    name: string,
    profileUrl: string
}

function UserCard({avatar, name, profileUrl}: UserCardProps) {
    return <div className="card">
        <a href={profileUrl} target="_blank" rel="noopener noreferrer">
            <img src={avatar} alt="reactjs" style={{width: "100px"}}/>
        </a>
        <p className="card-text">{name}</p>
    </div>;
}

function App() {
    const [key, setKey] = useState("hello");
    const [users, setUsers] = useState<User[]>([]);
    useEffect(() => {
        axios.get(`https://api.github.com/search/users?q=${key}`).then(res => {
            console.log(res.data);
            const users = res.data.items.map((item: any) => {
                return {
                    name: item.login,
                    avatar_url: item.avatar_url,
                    profileUrl: item.html_url
                }
            })
            setUsers(users);
        })
    }, []);
    console.log(users)
    return (
        <div className="App">
            <div className="container">
                <section className="jumbotron">
                    <h3 className="jumbotron-heading">Search Github Users</h3>
                    <div>
                        <input type="text" placeholder="enter the name you search"/>&nbsp;
                        <button>Search</button>
                    </div>
                </section>
                <div className="row">
                    {users.map(user => <UserCard name={user.name} avatar={user.avatar_url} profileUrl={user.profileUrl}/>)}
                </div>
            </div>
        </div>
    );
}

export default App;