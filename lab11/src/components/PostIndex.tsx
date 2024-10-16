import {NavLink} from "react-router-dom";
import React from "react";
import Post from "../types/Post";


interface PostIndexProps {
    posts: Post[]
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