import React from 'react'
import "./header.css"
import { Link } from 'react-router-dom'
const Header = ({isAuth}) => {
  return (
    <header>
        <div className='logo'>Easy-learn</div>
        <div className='link'>
            <Link to={'/'}>Home</Link>
            <Link to={'/course'}>Courses</Link>
            <Link to={'/about'}>About</Link>
            {
              isAuth ?(<Link to={'/account'}>Account</Link>):(
                <Link to={'/login'}>Login</Link>
              )
            }
        </div>
    </header>
  )
}

export default Header