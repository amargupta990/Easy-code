import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./home.css"
import Testimonail from '../../components/testimonial/Testimonail'

const Home = () => {
  const navigate=useNavigate()
  return (
    <div>
      <div className='home' >
        <div className='home-content'>
          <h1>Welcome to our Easy -Learning Platform</h1>
          <p>Learn , Grow , Excel</p>
          <button onClick={()=>navigate('/courses')} className='common-btn'>Get started</button>
        </div>
      </div>
      <Testimonail/>
    </div>
  )
}

export default Home