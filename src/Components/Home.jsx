import React from 'react'
import {FaReact} from 'react-icons/fa'

const Home = ({posts}) => {

  const textMarkUp = 'There ' + (posts.length === 0
    ? 'are no articles ' : posts.length > 1 ? `are ${posts.length} articles` : 'is 1 article') + ' so far...'

  const postsMarkUp = posts && posts.map(item => (
    <div className='post' key={item.id}>
      <h5>{item.title}</h5>
      <p className='italic'>{item.date} @ {item.username}</p>
    </div>
  ))

  return (
    <section className='home'>
      <div className='container'>
        <div className="hero">
          <FaReact size={50} />
          <h1>React Blog</h1>
          <FaReact size={50} />
        </div>
        <p>{textMarkUp}</p>
        <div className='posts-container'>{postsMarkUp}</div>
      </div>
    </section>
  )
}

export default Home
