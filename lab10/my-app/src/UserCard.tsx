import React from "react";

interface UserCardProps {
    avatar: string,
    name: string,
    profileUrl: string
}
export function UserCard({avatar, name, profileUrl}: UserCardProps) {
    return <div className="card">
        <a href={profileUrl} target="_blank" rel="noopener noreferrer">
            <img src={avatar} alt="reactjs" style={{width: "100px"}}/>
        </a>
        <p className="card-text">{name}</p>
    </div>;
}