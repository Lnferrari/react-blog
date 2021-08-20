import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {RiDeleteBin6Line} from 'react-icons/ri'
import {GrEdit, GrCheckmark} from 'react-icons/gr'
import {FaReact} from 'react-icons/fa'

const initialPostDataState = {
    title: '',
    content: ''
}

function ShowAllPosts({allPosts, editablePostId, setPostInEditionMode, updatePost, onDelete}) {
    const [editedPost, setEditedPost] = useState(initialPostDataState)

    // function editHandler(idx){
    //     const post = posts.filter(item => item.id === idx)
    //     setEditedPost({
    //         title: post.title,
    //         content: post.content
    //     })
    // }

    useEffect(() => {
        setPostInEditionMode(null)
    }, [])

    const handleMouseOver = post => {
        setPostInEditionMode(post.id)
    }

    const handleMouveOut = () => {
        setPostInEditionMode(null)
    }

    const handleEditClick = post => {
        setEditedPost({
            title: post.title,
            content: post.content
        })
        setPostInEditionMode(post.id)
    }

    const inputHandler = e => {
        setEditedPost({
            ...editedPost,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmitEdition = (postId, editedPostData) => {
        updatePost(postId, editedPostData)
        setPostInEditionMode(null)
    }

    const postCard = allPosts.map((item) => {
        return (
            <div className='postCard' key={item.id}>
                <div className='icons'>
                    {
                        item.id === editablePostId
                        ? <GrCheckmark onClick={() => handleSubmitEdition(item.id, editedPost)} />
                        : <GrEdit onClick={() => handleEditClick(item)} />
                    }
                    <RiDeleteBin6Line onClick={() => onDelete(item.id)} />
                </div>
                {
                    item.id === editablePostId ? (
                        <div className='edit'>
                            <input type="text" value={editedPost.title} name='title' onChange={inputHandler} autoComplete='off' />
                            <textarea value={editedPost.content} name='content' onChange={inputHandler} autoComplete='off' />
                        </div>
                    ) : (
                        <>
                            <h3>{item.title}</h3>
                            <p>{item.content}</p>
                            <Link to={`/show/${item.id}`}>read more...</Link>
                        </>
                    )
                }
                <p className='italic'>{item.date} @ {item.username}</p>          
            </div>
        )
    })

    return (
        <section className='allPosts'>
            <div className='container'>
                <div className="hero">
                    <FaReact size={50} />
                    <h1>Posts</h1>
                    <FaReact size={50} />
                </div>
                {/* {
                    allPosts > 0
                    ? 
                    : <p>There are no articles so far...</p>
                } */}
                {postCard}
            </div>
        </section>
    )
}

export default ShowAllPosts