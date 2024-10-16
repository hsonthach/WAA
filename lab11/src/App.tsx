import React, {useState} from 'react';
import './App.css';
import {NavLink, Route, Routes} from "react-router-dom";
import Post from "./types/Post";
import {PostShow} from "./components/PostShow";
import {PostIndex} from "./components/PostIndex";
import {PostEdit} from "./components/PostEdit";
import {NotFound} from "./NotFound";

const DEFAULT_POSTS: Post[] = [
    {id: 1, title: "Post 1"},
    {id: 2, title: "Post 2"},
    {id: 3, title: "Post 3"},
]

function App() {
    const [posts, setPosts] = useState(DEFAULT_POSTS);
    return (
        <div className="App">
            <nav>
                <NavLink to="/posts/" end>Posts</NavLink>
            </nav>
            <Routes>
                <Route path="/posts/" element={<PostIndex posts={posts}/>}/>
                <Route path="/posts/:id" element={<PostShow posts={posts}/>}/>
                <Route path={"/posts/:id/edit"} element={<PostEdit posts={posts} setPosts={setPosts}/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </div>
    );
}

export default App;
