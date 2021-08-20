import React from 'react'
import {useHistory} from 'react-router-dom'
import {FaReact} from 'react-icons/fa'



function CreatePost({handleInputChange, handleSubmit}) {
    const history = useHistory()

    function handleClick(){
        history.push('/show')
    }

    const handleFormSubmit = e => {
        handleSubmit(e)
        handleClick()
    }

    const createPostForm = (
        <form  onChange={(e) => handleInputChange(e)}>
            <div>
                <label>Username</label>
                <input type="text" name='username' autoComplete='off' required />
            </div>
            <div>
                <label>Title</label>
                <input type="text" name='title' autoComplete='off' required />
            </div>
            <div>
                <label>Content</label>
                <textarea name="content" id="" cols="30" rows="10" autoComplete='off' required />
            </div>
            <button onClick={(e) => {handleFormSubmit(e)}}>Create a Post</button>
        </form>
    )

    return (
        <section className='createPost'>
            <div className='container'>
                <div className="hero">
                <FaReact size={50} />
                    <h1>Create a Post</h1> 
                    <FaReact size={50} />

                </div>
                {createPostForm}
            </div>
        </section>
    )
}

export default CreatePost
