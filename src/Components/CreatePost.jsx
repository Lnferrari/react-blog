import React from 'react'
import {useHistory} from 'react-router-dom'


function CreatePost({handleInputChange, handleSubmit, isFormFilled}) {
    const history = useHistory()

    function handleClick(){
        // if (isFormFilled){
        //     history.push('/show')
        // }
        history.push('/show')
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
            <button onClick={(e) => {handleSubmit(e); handleClick()}}>Create a Post</button>
        </form>
    )

    return (
        <>
            <h1>Create a Post</h1>
            <div className='container'>
                    <div className="frameA">
                        <div className="frameB">
                            {createPostForm}
                        </div>
                    </div>
            </div>
        </>
    )
}

export default CreatePost
