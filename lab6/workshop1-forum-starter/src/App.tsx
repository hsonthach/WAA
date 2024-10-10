import { useState } from 'react'
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
    ctime: '10-18 08:15',
    like: 88,
  },
  {
    rpid: 2,
    user: {
      uid: '36080105',
      avatar: '',
      uname: 'Song Xu',
    },
    content: 'I search for you thousands of times, from dawn till dusk.',
    ctime: '11-13 11:29',
    like: 88,
  },
  {
    rpid: 1,
    user: {
      uid: '30009257',
      avatar,
      uname: 'John',
    },
    content: 'I told my computer I needed a break... now it will not stop sending me vacation ads.',
    ctime: '10-19 09:00',
    like: 66,
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
  { type: 'hot', text: 'Top' },
  { type: 'newest', text: 'Newest' },
]

const App = () => {

  const [list, setList] = useState(defaultList)
  const [comment, setComment] = useState('')

  function postMessageHandler(event: any): void {
    const newList = [...list]

    function getCurrentTime() {
      let time = new Date().toLocaleString();
      return time.split(' ')[0].split('/').slice(0, 2).join('-') + ' ' + time.split(' ')[1].slice(0, 5)
    }

// 11-13 11:29
    const time = getCurrentTime();
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

  return (
    <div className="app">
      {/* Nav Tab */}
      <div className="reply-navigation">
        <ul className="nav-bar">
          <li className="nav-title">
            <span className="nav-title-text">Comments</span>
            {/* Like */}
            <span className="total-reply">{10}</span>
          </li>
          <li className="nav-sort">
            {/* highlight class name： active */}
            <span className='nav-item'>Top</span>
            <span className='nav-item'>Newest</span>
          </li>
        </ul>
      </div>

      <div className="reply-wrap">
        {/* comments */}
        <div className="box-normal">
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
                    <span className="reply-time">{item.ctime}</span>
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