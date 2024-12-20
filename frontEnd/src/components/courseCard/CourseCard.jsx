import React from "react";
import "./coursecard.css";
import { UserData } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ courses }) => {
  const navigate = useNavigate();
  const { user, isAuth } = UserData();
  return (
    <div className="course-card">
      <img className="course-image" src={`${courses.image}`} />
      <h3>{courses.title}</h3>
      <p>Instructor-{courses.createdBy}</p>
      <p>Duration-{courses.duration}week</p>
      <p>Price: ₹{courses.price}</p>
      {isAuth ? (
        <>
          {user && user.role !== "admin" ? (
            <>
              {user.subscription.includes(courses._id) ? (
                <button
                  onClick={() => navigate(`/course/study/${courses._id}`)}
                  className="common-btn"
                >
                  Study
                </button>
              ) : (
                <button
                  onClick={() => navigate(`/course/${courses._id}`)}
                  className="common-btn"
                >
                  Get Started
                </button>
              )}
            </>
          ) : (
            <button
              onClick={() => navigate(`/course/study/${courses._id}`)}
              className="common-btn"
            >
              Study
            </button>
          )}
        </>
      ) : (
        <button onClick={() => navigate("/login")} className="common-btn">
          Get Started
        </button>
      )}
      <br/>
      {
        user && user.role==="admin" && <button className="common-btn" style={{background:"red"}}>Delete</button>
      }
    </div>
  );
};

export default CourseCard;
