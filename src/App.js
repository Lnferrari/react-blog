import React, { useState, useEffect, useRef }  from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import moment from 'moment'
import Home from './Components/Home';
import CreatePost from './Components/CreatePost';
import ShowAllPosts from './Components/ShowAllPosts'
import ShowSinglePost from './Components/ShowSinglePost'

const initialPostState = {
  id: '',
  username: '',
  title: '',
  content: '',
  date: ''
}


function App() {

  /**
    Yo aca le cambiaria los stateName a: 
    [allPosts, setAllPosts] y [currentPost, setCurrentPost]
    para entender mejor cual es la diferencia entre uno y el otro
  */
  const [ posts, setPosts ] = useState([])
  const [ post, setPost ] = useState(initialPostState)
  
  /**
    Le agrego este editablePost state para manejar que post se esta
    editando a traves del ID y dejo de usar el isEditable.
  */
  const [ editablePostId, setEditablePostId ] = useState()

  const createPost = post => {
    setPosts([...posts, post])
  }

  const deletePost = id => {
    const filteredPostsList = posts.filter(post => post.id !== id)
    setPosts(filteredPostsList)
  }

  const updatePost = (id, postData) => {
    const currentPosts = posts
    currentPosts.forEach((post, index, originalArray) => {
      if(post.id === id) {
        originalArray[index].title = postData.title
        originalArray[index].content = postData.content
      }
    });

    setPosts(currentPosts)
  }

  const setPostInEditionMode = id => {
    setEditablePostId(id)
  }   

  function generateID(){
    return Math.floor(Math.random() * Date.now()).toString()
  }

  function handleInputChange(e){
    setPost({
      ...post, 
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit(e){
    e.preventDefault();

    const newPost = {
      ...post,
      id: generateID(),
      date: `${moment().format('L')} ${moment().format('LT')}`
    }

    createPost(newPost)
  }

  /*
  useEffect(()=>{
    setPost(initialPostState)
  }, [posts])
  */

  return (
    <div className="App">
      <Router>
        <nav>
          <div className='nav-item'>
            <Link to='/'>Home</Link>
          </div>
          <div className='nav-item'>
            <Link to='/create' >Create A Post</Link>
          </div>
          <div className='nav-item'>
            <Link to='/show'> Show Current Posts</Link>
          </div>
        </nav>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/create'>
            <CreatePost 
              handleSubmit={handleSubmit} 
              handleInputChange={handleInputChange} 
            />
          </Route>
          <Route path='/show' exact>
            <ShowAllPosts 
              posts={posts}
              editablePostId={editablePostId}
              onDelete={deletePost}
              setPostInEditionMode={setPostInEditionMode} 
              updatePost={updatePost}
            />
          </Route>
          <Route path='/show/:postID'>
            <ShowSinglePost posts={posts} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
