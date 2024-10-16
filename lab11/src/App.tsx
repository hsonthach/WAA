import React from 'react';
import logo from './logo.svg';
import './App.css';
import {NavLink, Route, Routes, useParams} from "react-router-dom";


let posts = [
    {id: 1, title: "Post 1"},
    {id: 2, title: "Post 2"},
    {id: 3, title: "Post 3"},
]

function PostIndex() {
    return <div>
        {posts.map((post) => {
            return <div key={post.id}>
                <NavLink to={`/posts/${post.id}`}>{post.title}</NavLink>
            </div>
        })}
    </div>
}

interface PostProps {
    id: string,
    title: string
}

function Post({id, title}: PostProps) {
    return <div>
        {title} - {id}

    </div>
}

function PostShow() {
    const params = useParams();
    const id = params.id;
    const post = posts.find((post) => post.id.toString() === id);
    if (!post) {
        return <div>
            Post not found
        </div>
    }
    return <div>
        <Post id={post.id.toString()} title={post.title}/>
        <NavLink to={`/posts/${post.id}/edit`}>Edit</NavLink>
    </div>
}

function NotFound() {
    return <div>
        404
    </div>
}

function PostEdit() {
    const params = useParams();
    const id = params.id;
    const post = posts.find((post) => post.id.toString() === id);
    return <form onSubmit={(event)=>{
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const title = formData.get("title");
        posts = posts.map((post) => {
            if (post.id.toString() === id) {
                return {
                    id: post.id,
                    title: title?.toString() || ""
                }
            }
            return post;
        })
    }}>
        <input type="text" name="title" defaultValue={post?.title}/>
        <button type="submit">Save</button>
    </form>
}

function App() {
    return (
        <div className="App">
            <nav>
                <NavLink to="/posts/" end>Posts</NavLink>
            </nav>
            <Routes>
                <Route path="/posts/" element={<PostIndex/>}/>
                <Route path="/posts/:id" element={<PostShow/>}/>
                <Route path={"/posts/:id/edit"} element={<PostEdit/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </div>
    );
}

export default App;
