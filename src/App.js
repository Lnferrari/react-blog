import React, { useState, useEffect, useRef }  from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import moment from 'moment'
import Home from './Components/Home';
import CreatePost from './Components/CreatePost';
import ShowAllPosts from './Components/ShowAllPosts'
import ShowSinglePost from './Components/ShowSinglePost'

function App() {
  const [posts, setPosts] = useState([])
  const [post, setPost] = useState({
    id: '',
    username: '',
    title: '',
    content: '',
    date: '',
    isEditable: false
  })
  const inputValue = useRef()
  // const [isFormFilled, setIsFormFilled] = useState(false)
  

  function generateID(){
    return Math.floor(Math.random() * Date.now()).toString()
  }

  function handleInputChange(e){
    setPost({...post, [e.target.name]: e.target.value})

    // if(post.username !== '' && post.title !== '' && post.content !== '') {
    //   setIsFormFilled(true)
    // } else {
    //   setIsFormFilled(false)
    // }
  }

  function handleSubmit(e){
    e.preventDefault();
    inputValue.current = post.title
    // if(post.username === '' || post.title === '' || post.content === '') {
    //   alert('Please, fill out all fields')
    // }
    setPosts([{...post, id: generateID(), date: `${moment().format('L')} ${moment().format('LT')}`}, ...posts]);
    // setPosts([{...post, date: moment().calendar()}, ...posts]);
  }

  function editPost(idx){
    setPosts(posts.map(post=> {
      if(post.id === idx){
        post.isEditable = true
      }
      return post
    }))
  }

  function saveChanges(idx, editedTitle, editedContent){
    setPosts(posts.map(post=> {
      if(post.id === idx){
        post.title = editedTitle
        post.content = editedContent
        post.isEditable = false
      }
      return post
    }))
    // setPosts(post=> post.id === idx && {...post, title: editedTitle, content: editedContent});

    // const postIdx = posts.findIndex(post => post.id === id)
    // const posts_copy = [...posts]
    // posts_copy[postIdx] = {...posts[postIdx],
    //   username: userName,
    //   title: title,
    //   content: content
    // }
    // setPosts(posts_copy)
  }

  function deletePostHandler(id){
    setPosts(posts.filter(post => post.id !== id))
  }

  useEffect(()=>{
    setPost({
      id: '',
      username: '',
      title: '',
      content: '',
      date: '',
      isEditable: false
    })
  }, [posts])

  return (
    <div className="App">
      <Router>
        <nav>
          <div className='nav-item'>
            <Link to='/'>Home</Link>
          </div>
          <div className='nav-item'>
            <Link to='/create' >Create A Post</Link> {/* onClick={() => setIsFormFilled(false)} */}
          </div>
          <div className='nav-item'>
            <Link to='/show'> Show Current Posts</Link>
          </div>
        </nav>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/create'>
            <CreatePost handleSubmit={handleSubmit} handleInputChange={handleInputChange} /> {/* isFormFilled={isFormFilled}  */}
          </Route>
          <Route path='/show' exact>
            <ShowAllPosts posts={posts} onDelete={deletePostHandler} onEdit={editPost} saveChanges={saveChanges} handleInputChange={handleInputChange}  />
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
