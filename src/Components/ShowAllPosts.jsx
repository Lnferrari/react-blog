import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {RiDeleteBin6Line} from 'react-icons/ri'
import {GrEdit, GrCheckmark} from 'react-icons/gr'

const initialPostDataState = {
  title: '',
  content: ''
}

function ShowAllPosts({
  posts,
  editablePostId,
  onDelete,
  setPostInEditionMode,
  updatePost
}) {

  /**
    Evito que un post me quede en modo editable si el usuario
    se fue a otro lado en el medio de la edicion
  */
  useEffect(() => {
    setPostInEditionMode(null)
  }, [])
    
  const [editedPost, setEditedPost] = useState(initialPostDataState)

  /**
    Siempre conviene sacar la logica fuera del renderizado,
    sino no se entiende una goma
  */
  const handleEditClick = (post) => {
    setEditedPost({
      title: post.title,
      content: post.content
    })
    setPostInEditionMode(post.id)
  }

  const handleSubmitEdition = (postId, editedPostData) => {
    updatePost(postId, editedPostData)
    
    //Despues de updetear, seteo que ningun post quede editable
    setPostInEditionMode(null)
  }

  function inputHandler(e){
    setEditedPost({
      ...editedPost, 
      [e.target.name]: e.target.value
    })
  }


  const postCard = posts && (posts.map((item) => {
    return (
      <div className='postCard' key={item.id}>
        <div className='icons'>
          {
            item.id === editablePostId ? 
            <GrCheckmark onClick={() => handleSubmitEdition(item.id, editedPost)} /> : 
            <GrEdit onClick={() => handleEditClick(item)} />
          }
          <RiDeleteBin6Line onClick={() => onDelete(item.id)} />
        </div>
        {
          item.id === editablePostId ? (
            <div className='edit'>
              <input 
                value={editedPost.title} 
                type="text" 
                name='title' 
                onChange={inputHandler} 
                autoComplete='off' 
              />
              <textarea 
                value={editedPost.content} 
                name='content' 
                onChange={inputHandler} 
                autoComplete='off' 
              />
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
          <div className="frameB">{postCard}</div>
        </div>
      </div>
    </>
  )
}

export default ShowAllPosts