import React from 'react'
import {useParams} from 'react-router-dom'
import {FaReact} from 'react-icons/fa'

function ShowSinglePost({allPosts}) {
    const {postID} = useParams()

    const singlePost = postID && (allPosts.map(item => {
        return item.id === postID && (
            <><div className="hero">
                <FaReact size={50} />
                <h1>{item.title}</h1>
                <FaReact size={50} />
            </div>
            <div className='Post' key={item.id}>
                <p>{item.content}</p>
                <p className='footer italic'>{item.date} @ {item.username}</p>
            </div></>
        )
    }))

    return (
        <section className='singlePost'>
            <div className="container">
                {singlePost}
            </div>
        </section>
    )
}

export default ShowSinglePost