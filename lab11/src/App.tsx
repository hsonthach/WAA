import React, {useState} from 'react';
import './App.css';
import {NavLink, Route, Routes, useParams} from "react-router-dom";

interface Post {
    id: number,
    title: string
}



const DEFAULT_POSTS: Post[] = [
    {id: 1, title: "Post 1"},
    {id: 2, title: "Post 2"},
    {id: 3, title: "Post 3"},
]

interface PostIndexProps {
    posts: Post[]
}

interface PostProps {
    id: string,
    title: string
}

export function PostIndex({posts}: PostIndexProps) {
    return <div>
        {posts.map((post) => {
            return <div key={post.id}>
                <NavLink to={`/posts/${post.id}`}>{post.title}</NavLink>
            </div>
        })}
    </div>
}

function Post({id, title}: PostProps) {
    return <div>
        {title} - {id}

    </div>
}

interface PostShowProps {
    posts: Post[]
}

function PostShow({posts}: PostShowProps) {
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

interface PostEditProps {
    posts: Post[],
    setPosts: (posts: Post[]) => void
}

function PostEdit({posts, setPosts}: PostEditProps) {
    const params = useParams();
    const id = params.id;
    const post = DEFAULT_POSTS.find((post) => post.id.toString() === id);
    return <form onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const title = formData.get("title");
        const newPosts = posts.map((post) => {
            if (post.id.toString() === id) {
                return {
                    id: post.id,
                    title: title?.toString() || ""
                }
            }
            return post;
        })
        setPosts(newPosts);
    }}>
        <input type="text" name="title" defaultValue={post?.title}/>
        <button type="submit">Save</button>
    </form>
}

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
