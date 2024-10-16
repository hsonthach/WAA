import {NavLink, useParams} from "react-router-dom";
import {PostCard} from "./PostCard";
import React from "react";
import Post from "../types/Post";

interface PostShowProps {
    posts: Post[]
}

export function PostShow({posts}: PostShowProps) {
    const params = useParams();
    const id = params.id;
    const post = posts.find((post) => post.id.toString() === id);
    if (!post) {
        return <div>
            Post not found
        </div>
    }
    return <div>
        <PostCard id={post.id.toString()} title={post.title}/>
        <NavLink to={`/posts/${post.id}/edit`}>Edit</NavLink>
    </div>
}