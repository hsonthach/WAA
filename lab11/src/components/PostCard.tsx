import React from "react";

interface PostProps {
    id: string,
    title: string
}

export function PostCard({id, title}: PostProps) {
    return <div>
        {title} - {id}

    </div>
}