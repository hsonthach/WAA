import React, {useEffect, useState} from 'react';
import './App.css';
import axios from "axios";

interface User {
  name: string;
  avatar_url: string;
}

function App() {
  const [key, setKey] = useState("hello");
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    axios.get(`https://api.github.com/search/users?q=${key}`).then(res=>{
        console.log(res.data);
        setUsers(res.data.items);
    })
  }, []);
  console.log(users)
  return (
      <div className="App">
        <div className="container">
          <section className="jumbotron">
            <h3 className="jumbotron-heading">Search Github Users</h3>
            <div>
              <input type="text" placeholder="enter the name you search" />&nbsp;
              <button>Search</button>
            </div>
          </section>
          <div className="row">
            <div className="card">
              <a href="https://github.com/reactjs" target="_blank" rel="noopener noreferrer">
                <img src="https://avatars.githubusercontent.com/u/6412038?v=3" alt="reactjs" style={{ width: '100px' }} />
              </a>
              <p className="card-text">reactjs</p>
            </div>
            <div className="card">
              <a href="https://github.com/reactjs" target="_blank" rel="noopener noreferrer">
                <img src="https://avatars.githubusercontent.com/u/6412038?v=3" alt="reactjs" style={{ width: '100px' }} />
              </a>
              <p className="card-text">reactjs</p>
            </div>
            <div className="card">
              <a href="https://github.com/reactjs" target="_blank" rel="noopener noreferrer">
                <img src="https://avatars.githubusercontent.com/u/6412038?v=3" alt="reactjs" style={{ width: '100px' }} />
              </a>
              <p className="card-text">reactjs</p>
            </div>
            <div className="card">
              <a href="https://github.com/reactjs" target="_blank" rel="noopener noreferrer">
                <img src="https://avatars.githubusercontent.com/u/6412038?v=3" alt="reactjs" style={{ width: '100px' }} />
              </a>
              <p className="card-text">reactjs</p>
            </div>
            <div className="card">
              <a href="https://github.com/reactjs" target="_blank" rel="noopener noreferrer">
                <img src="https://avatars.githubusercontent.com/u/6412038?v=3" alt="reactjs" style={{ width: '100px' }} />
              </a>
              <p className="card-text">reactjs</p>
            </div>
          </div>
        </div>
      </div>
  );
}

export default App;