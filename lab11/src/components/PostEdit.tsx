import Post from "../types/Post";
import {useParams} from "react-router-dom";
import React from "react";

interface PostEditProps {
    posts: Post[],
    setPosts: (posts: Post[]) => void
}

export function PostEdit({posts, setPosts}: PostEditProps) {
    const params = useParams();
    const id = params.id;
    const post = posts.find((post) => post.id.toString() === id);
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