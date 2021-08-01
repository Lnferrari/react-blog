import React, { useState, useEffect }  from 'react';
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
  const [allPosts, setAllPosts] = useState([])
  const [currentPost, setCurrentPost] = useState(initialPostState)
  const [editablePostId, setEditablePostId] = useState()

  function generateID(){
    return Math.floor(Math.random() * Date.now()).toString()
  } 

  function handleInputChange(e){
    setCurrentPost({
      ...currentPost,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit(e){
    e.preventDefault();
    const newPost = {
      ...currentPost,
      id: generateID(),
      date: `${moment().format('L')} ${moment().format('LT')}`
    }
    createPost(newPost)
  }

  const createPost = post => {
    setAllPosts([post, ...allPosts])
  }

  const updatePost = (id, postData) => {
    const currentPosts = allPosts;
    currentPosts.forEach((post, index, originalArray) => {
      if(post.id === id) {
        originalArray[index].title = postData.title
        originalArray[index].content = postData.content
      }
    });
    setAllPosts(currentPosts)
  }

  const deletePost = id => {
    const filteredPostsList = allPosts.filter(post => post.id !== id)
    setAllPosts(filteredPostsList)
  }

  const setPostInEditionMode = id => {
    setEditablePostId(id)
  }  

  useEffect(()=>{
    setCurrentPost(initialPostState)
  }, [allPosts])

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
            <CreatePost handleSubmit={handleSubmit} handleInputChange={handleInputChange} />
          </Route>
          <Route path='/show' exact>
            <ShowAllPosts allPosts={allPosts} editablePostId={editablePostId} onDelete={deletePost} setPostInEditionMode={setPostInEditionMode} 
              updatePost={updatePost}  />
          </Route>
          <Route path='/show/:postID'>
            <ShowSinglePost allPosts={allPosts} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
