import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {RiDeleteBin6Line} from 'react-icons/ri'
import {GrEdit, GrCheckmark} from 'react-icons/gr'

function ShowAllPosts({posts, onEdit, saveChanges, onDelete}) {
    const [editedPost, setEditedPost] = useState({
        title: '',
        content: ''
    })

    function inputHandler(e){
        setEditedPost({...editedPost, [e.target.name]: e.target.value})
    }

    function editHandler(idx){
        const post = posts.filter(item => item.id === idx)
        setEditedPost({
            title: post.title,
            content: post.content
        })
    }

    // const saveChangesBtn = (
    //     <button onClick={()=> onEdit(item.id, )}>Save Changes</button>
    // )

    const postCard = posts && (posts.map((item) => {
        return (
            <div className='postCard' key={item.id}>
                <div className='icons'>
                    {item.isEditable ? <GrCheckmark onClick={() => {saveChanges(item.id, editedPost.title, editedPost.content)}} /> : <GrEdit onClick={() => {setEditedPost({title: item.title, content: item.content}); onEdit(item.id); editHandler(item.id)}} />}
                    <RiDeleteBin6Line onClick={() => onDelete(item.id)} />
                </div>
                {item.isEditable ? (
                    <div className='edit'>
                        <input type="text" value={editedPost.title} name='title' onChange={inputHandler} autoComplete='off' />
                        <textarea value={editedPost.content} name='content' onChange={inputHandler} autoComplete='off' />
                    </div>
                ) : (
                    <>
                        <h3>{item.title}</h3>
                        <Link to={`/show/${item.id}`}>Read the full article</Link>
                    </>
                )}
                
                <p className='italic'>{item.date} @ {item.username}</p>
                
            </div>
        )
    }))

    return (
        <>
            <h1>Posts</h1>
            <div className='container'>
                <div className="frameA">
                    <div className="frameB">
                        {postCard}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShowAllPosts