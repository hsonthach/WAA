import {useState} from 'react'
import './App.scss'
import avatar from './images/bozai.png'


// Comment List data
const defaultList = [
    {
        // comment id
        rpid: 3,
        // user info
        user: {
            uid: '13258165',
            avatar: '',
            uname: 'Jay Zhou',
        },
        // comment content
        content: 'Nice, well done',
        // created datetime
        ctime: '2024-10-09T19:54:13.462Z',
        like: 100,
    },
    {
        rpid: 2,
        user: {
            uid: '36080105',
            avatar: '',
            uname: 'Song Xu',
        },
        content: 'I search for you thousands of times, from dawn till dusk.',
        ctime: '2024-10-10T19:54:13.462Z',
        like: 5,
    },
    {
        rpid: 1,
        user: {
            uid: '30009257',
            avatar,
            uname: 'John',
        },
        content: 'I told my computer I needed a break... now it will not stop sending me vacation ads.',
        ctime: '2024-10-08T19:54:13.462Z',
        like: 10,
    },
]
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
    {type: 'hot', text: 'Top'},
    {type: 'newest', text: 'Newest'},
]

const App = () => {

    const [list, setList] = useState(defaultList)
    const [comment, setComment] = useState('')
    const [currentFilter, setCurrentFilter] = useState('')

    function postMessageHandler(event: any): void {
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

    function formatTime(ctime: string) {
        const time = new Date(ctime)
        // to '10-18 08:15'
        return `${time.getMonth() + 1}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}`

    }

    return (
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
                        <span className={`nav-item ${currentFilter==='top'?'active':''}`} onClick={()=>sortList('top')}>Top</span>
                        <span className={`nav-item ${currentFilter==='latest'?'active':''}`} onClick={()=>sortList('latest')}>Newest</span>
                    </li>
                </ul>
            </div>

            <div className="reply-wrap">
                {/* comments */}
                <div className="box-normal">
                    {/* current logged in user profile */}
                    <div className="reply-box-avatar">
                        <div className="bili-avatar">
                            <img className="bili-avatar-img" src={avatar} alt="Profile"/>
                        </div>
                    </div>
                    <div className="reply-box-wrap">
                        {/* comment */}
                        <textarea
                            className="reply-box-textarea"
                            placeholder="tell something..."
                            onChange={(event) => {
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
                </div>
                {/* comment list */}
                <div className="reply-list">
                    {/* comment item */}
                    {list.map((item) => <div key={item.rpid}>
                        <div className="reply-item">
                            {/* profile */}
                            <div className="root-reply-avatar">
                                <div className="bili-avatar">
                                    <img
                                        className="bili-avatar-img"
                                        alt=""
                                        src={item.user.avatar || avatar}
                                    />
                                </div>
                            </div>

                            <div className="content-wrap">
                                {/* username */}
                                <div className="user-info">
                                    <div className="user-name">{item.user.uname}</div>
                                </div>
                                {/* comment content */}
                                <div className="root-reply">
                                    <span className="reply-content">{item.content}</span>
                                    <div className="reply-info">
                                        {/* comment created time */}
                                        <span className="reply-time">{formatTime(item.ctime)}</span>
                                        {/* total likes */}
                                        <span className="reply-time">Like:{item.like}</span>
                                        <span className="delete-btn" onClick={() => deleteComment(item.rpid)}>
                    Delete
                  </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>)}


                </div>
            </div>
        </div>
    )
}

export default App