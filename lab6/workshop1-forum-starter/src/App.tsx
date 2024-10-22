import { useEffect, useState } from 'react'
import './App.scss'
import avatar from './images/bozai.png'
import { useRef } from 'react';
import axios from 'axios';
import React from 'react';


// Comment List data
// current logged in user info
const user = {
    // userid
    uid: '30009257',
    // profile
    avatar,
    // username
    uname: 'John',
}

// Nav Tab
const tabs = [
    { type: 'hot', text: 'Top' },
    { type: 'newest', text: 'Newest' },
]

function formatTime(ctime: string) {
    const time = new Date(ctime)
    // to '10-18 08:15'
    return `${time.getMonth() + 1}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}`

}

function StatefulPost(props: { list: any, setList: any }) {
    const { list, setList } = props
    const [comment, setComment] = useState('')
    const postMessageHandler = (event: any) => {
        const newList = [...list]

        // 11-13 11:29
        const time = new Date().toISOString()
        newList.unshift({
            rpid: list.length + 1,
            user: {
                uid: user.uid,
                avatar: user.avatar,
                uname: user.uname,
            },
            content: comment,
            ctime: time,
            like: 0,
        })
        console.log(newList)
        setList(newList)
        setComment('')
    }

    return <div className="box-normal">
        {/* current logged in user profile */}
        <div className="reply-box-avatar">
            <div className="bili-avatar">
                <img className="bili-avatar-img" src={avatar} alt="Profile" />
            </div>
        </div>
        <div className="reply-box-wrap">
            {/* comment */}
            <textarea
                className="reply-box-textarea"
                placeholder="tell something..."
                onChange={(event: any) => {
                    console.log(event.target.value)
                    setComment(event.target.value)
                }}
                value={comment}
            />
            {/* post button */}
            <div className="reply-box-send">
                <div className="send-text" onClick={postMessageHandler}>post</div>
            </div>
        </div>
    </div>;
}


function StatelessPost({ list, setList }: { list: any; setList: any }) {
    const commentRef = useRef<HTMLTextAreaElement>(null);

    const postMessageHandler = (event: any) => {
        const newList = [...list];
        const time = new Date().toISOString();
        newList.unshift({
            rpid: list.length + 1,
            user: {
                uid: user.uid,
                avatar: user.avatar,
                uname: user.uname,
            },
            content: commentRef.current?.value || '',
            ctime: time,
            like: 0,
        });
        console.log(newList);
        setList(newList);
        if (commentRef.current) {
            commentRef.current.value = '';
        }
    };

    return (
        <div className="box-normal">
            <div className="reply-box-avatar">
                <div className="bili-avatar">
                    <img className="bili-avatar-img" src={avatar} alt="Profile" />
                </div>
            </div>
            <div className="reply-box-wrap">
                <textarea
                    className="reply-box-textarea"
                    placeholder="tell something..."
                    ref={commentRef}
                />
                <div className="reply-box-send">
                    <div className="send-text" onClick={postMessageHandler}>
                        post
                    </div>
                </div>
            </div>
        </div>
    );
}

interface Item {
    rpid: number,
    user: {
        uid: string,
        avatar: string,
        uname: string,
    },
    content: string,
    ctime: string,
    like: number,
}

const DEFAULT_DICT: Item[] = []

function Comment(props: { item: Item, onClick: () => void }) {
    return <div className="reply-item">
        {/* profile */}
        <div className="root-reply-avatar">
            <div className="bili-avatar">
                <img
                    className="bili-avatar-img"
                    alt=""
                    src={props.item.user.avatar || avatar}
                />
            </div>
        </div>

        <div className="content-wrap">
            {/* username */}
            <div className="user-info">
                <div className="user-name">{props.item.user.uname}</div>
            </div>
            {/* comment content */}
            <div className="root-reply">
                <span className="reply-content">{props.item.content}</span>
                <div className="reply-info">
                    {/* comment created time */}
                    <span className="reply-time">{formatTime(props.item.ctime)}</span>
                    {/* total likes */}
                    <span className="reply-time">Like:{props.item.like}</span>
                    <span className="delete-btn" onClick={props.onClick}>
                        Delete
                    </span>
                </div>
            </div>
        </div>
    </div>;
}

const ThemeContext = React.createContext({
    theme: 'light',
    toggleTheme: () => { }
});


const App = () => {

    const [list, setList] = useState(DEFAULT_DICT)
    const [comment, setComment] = useState('')
    const [currentFilter, setCurrentFilter] = useState('')
    useEffect(() => {
        axios.get('http://localhost:3000/list').then((res: {
            data: Item[]
        }) => {
            console.log(res.data)
            setList(res.data)
        })
    }, [])


    function deleteComment(rpid: number) {
        const newList = list.filter((item) => item.rpid !== rpid)
        setList(newList)
    }

    let totalLike = list.reduce((acc, item) => acc + item.like, 0);

    const sortList = (type: string) => {
        console.log(type)
        if (type === 'top') {
            const newList = [...list]
            newList.sort((a, b) => {
                return b.like - a.like
            })
            console.log(newList)
            setList(newList)
        } else if (type === 'latest') {
            const newList = [...list]
            newList.sort((a, b) => {
                return new Date(b.ctime).getTime() - new Date(a.ctime).getTime()
            })
            console.log(newList)
            setList(newList)
        }
        setCurrentFilter(type)
    }

    const [theme, setTheme] = useState('light');

    return (
        <ThemeContext.Provider value={{
            theme,
            toggleTheme: () => {
                setTheme(theme === 'light' ? 'dark' : 'light');
            },
        }}>
            <div className="app">
                {/* Nav Tab */}
                <div className="reply-navigation">
                    <ul className="nav-bar">
                        <li className="nav-title">
                            <span className="nav-title-text">Comments</span>
                            {/* Like */}
                            <span className="total-reply">{totalLike}</span>
                        </li>
                        <li className="nav-sort">
                            {/* highlight class name： active */}
                            <span className={`nav-item ${currentFilter === 'top' ? 'active' : ''}`}
                                onClick={() => sortList('top')}>Top</span>
                            <span className={`nav-item ${currentFilter === 'latest' ? 'active' : ''}`}
                                onClick={() => sortList('latest')}>Newest</span>
                        </li>
                    </ul>
                </div>

                <div className="reply-wrap">
                    <StatelessPost list={list} setList={setList} />
                    <div className="reply-list">
                        {/* comment item */}
                        {list.map((item) => <div key={item.rpid}>
                            <Comment item={item} onClick={() => deleteComment(item.rpid)} />
                        </div>)}
                    </div>
                </div>
            </div>
        </ThemeContext.Provider>
    )
}

export default App