import React from 'react'
import {useParams} from 'react-router-dom'

function ShowSinglePost({posts}) {
    const {postID} = useParams()

    const singlePost = postID && (posts.map((item) => {
        return item.id === postID ? (
            <div className='Post' key={item.id}>
                <h2>{item.title}</h2>
                <p>{item.content}</p>
                <p className='footer italic'>{item.date} @ {item.username}</p>
            </div>
        ) : null
    }))
    return (
        <>
            <h1>Post</h1>
            <div className="container">
                <div className="frameA">
                    <div className='frameB'>
                        {singlePost}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShowSinglePost