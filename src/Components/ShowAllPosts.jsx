import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {RiDeleteBin6Line} from 'react-icons/ri'
import {GrEdit, GrCheckmark} from 'react-icons/gr'

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

    const handleEditClick = (post) => {
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

    const postCard = allPosts && (allPosts.map((item) => {
        return (
            <div className='postCard' key={item.id}>
                <div className='icons'>
                    {
                        item.id === editablePostId ?
                        <GrCheckmark onClick={() => {handleSubmitEdition(item.id, editedPost)}} /> :
                        <GrEdit onClick={() => handleEditClick(item)} />
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
                            <Link to={`/show/${item.id}`}>Read the full article</Link>
                        </>
                    )
                }
                
                <p className='italic'>{item.date} @ {item.username}</p>
                    
            </div>
        )
    }))

    return (
        <>
            <h1>Posts</h1>
            <div className='container'>
                <div className="frameA">
                    <div className="frameB">{postCard}</div>
                </div>
            </div>
        </>
    )
}

export default ShowAllPosts