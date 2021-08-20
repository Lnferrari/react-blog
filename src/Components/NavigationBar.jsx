import React from 'react'
import { NavLink } from 'react-router-dom'
import { FiSun, FiMoon } from 'react-icons/fi'

const NavigationBar = ({onClick, theme}) => {
  return (
    <nav>
      <div className='navItems-container'>
        <div className='nav-item'>
          <NavLink exact to='/' activeClassName='active' >
            Home
          </NavLink>
        </div>
        <div className='nav-item'>
          <NavLink exact to='/create' activeClassName='active' >
            Create a post
          </NavLink>
        </div>
        <div className='nav-item'>
          <NavLink exact to='/show' activeClassName='active' >
            Show current posts
          </NavLink>
        </div>
      </div>
      <button onClick={onClick}>
        {
          theme === 'light' ?
          <FiMoon />
          : <FiSun />
        }
      </button>
    </nav>
  )
}

export default NavigationBar
