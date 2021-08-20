import React, { useState, useEffect }  from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import moment from 'moment'
import Home from './Components/Home';
import CreatePost from './Components/CreatePost';
import ShowAllPosts from './Components/ShowAllPosts'
import ShowSinglePost from './Components/ShowSinglePost'
import NavigationBar from './Components/NavigationBar';
import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyles, lightTheme, darkTheme } from './themes.js'
import './main.scss';
import { stringify } from 'uuid';

const initialPostState = {
  id: '',
  username: '',
  title: '',
  content: '',
  date: ''
}

const StyledApp = styled.div``

const App = () => {
  const localPosts = JSON.parse(localStorage.getItem('allPosts'))
  const [theme, setTheme] = useState('light')
  const [allPosts, setAllPosts] = useState(localPosts)
  const [currentPost, setCurrentPost] = useState(initialPostState)
  const [editablePostId, setEditablePostId] = useState()

  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
  }

  const generateID = () => {
    return Math.floor(Math.random() * Date.now()).toString()
  } 

  const handleInputChange = (e) => {
    setCurrentPost({
      ...currentPost,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e)=> {
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
    localStorage.setItem('allPosts', JSON.stringify(allPosts))
  }, [allPosts])

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <StyledApp className="App">
        <Router>
          <GlobalStyles />
          <NavigationBar onClick={themeToggler} theme={theme}/>
          <Switch>
            <Route path='/' exact component={() => <Home posts={allPosts} />} />
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
      </StyledApp>
    </ThemeProvider>
  );
}

export default App;
