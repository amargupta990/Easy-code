import React from 'react'
import "./course.css"
import { CourseData } from '../../context/CourseContext'
import CourseCard from '../../components/courseCard/CourseCard'
const Course = () => {
    const {courses}=CourseData()
  return (
    <div className='courses'>

        <h2>Available courses</h2>
        <div className='course-container'>
            {
                courses && courses.length>0 ?courses.map((e)=>(
                  <CourseCard key={e.id} courses={e}/>  
                )) : <p>no courses yet</p>
            }
        </div>
    </div>  
  )
}

export default Course