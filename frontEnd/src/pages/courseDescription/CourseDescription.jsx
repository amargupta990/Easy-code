import React, { useEffect, useState } from 'react'
import "./description.css"
import { useNavigate, useParams} from "react-router-dom"
import { CourseData } from '../../context/CourseContext'

const CourseDescription = ({user}) => {
    const params = useParams()
    const navigate = useNavigate()
   const {fetchCourse , course} = CourseData()
   const [screenload , setScreenload]=useState(false);
   useEffect(()=>{
    fetchCourse(params.id)
   },[])
   const checkOutHandler = async () => {
     const token = localStorage.getItem("token")
     setScreenload(true)
     const {data:{order}}= await axios.post(`${server}/api/course/checkout/${params.id}`,
        {},
        {
            headers :{
                token
            },
        }
     );
   }
     return (
    <>
      {
        course && <div className='course-description'>
            <div className='course-header'>
                <img
                 src={`${course.image}`}
                 className='course-image'
                 />
                 <div className='course-info'>
                    <h2>{course.title}</h2>
                    <p> instructorb : {course.createdBy}</p>
                    <p>Duration : {course.duration} weeks</p>
                 </div>
            </div>
            <p>Lets get Started with this course At ₹{course.price}</p>
                 {console.log(course._id)}

                    {
                        user && user.subscription.includes(course._id)
                        ?
                        (<button onClick={()=>navigate(`/course/study/${course._id}`)} className='common-btn'>
                        Study
                        </button>):
                        (<button onClick={checkOutHandler} className='common-btn'>Buy Now</button>)
                    }
        </div>
      }
    </>
  )
}

export default CourseDescription