import React from 'react'
import "./App.css"
import {BrowserRouter  , Routes ,Route, } from "react-router-dom"
import Home from './pages/home/Home'
import Header from "./components/header/Header"
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Verify from './pages/auth/Verify'
import Footer from './components/footer/Footer'
import About from './pages/about/About'
import Account from './pages/account/Account'
import { UserData  } from './context/UserContext'
import Loader from './components/loader/Loader'
import Course from './pages/coures/Course'
import CourseDescription from './pages/courseDescription/CourseDescription'
const App = () => {
  const {isAuth,user,loading}= UserData()
  
  return (
    <>
     {
      loading?(<Loader/>):(
        <BrowserRouter>
      <Header isAuth={isAuth}/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/course' element={<Course/>} />
          <Route path='/account' element={isAuth ? <Account user={user}/>:<Login/>} />
          <Route path='/login' element={isAuth ?<Home/>:<Login/>} />
          <Route path='/register' element={isAuth ?<Home/>:<Register/>} />
          <Route path='/verify' element={isAuth ?<Home/>:<Verify/>} />
          <Route path='/course/:id' element={isAuth ?<CourseDescription user={user} />:<Login/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
      )
     }
    </>
  )
}

export default App