import React from "react";
import "./account.css";
import { MdDashboard } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { UserData } from "../../context/UserContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Account = ({ user }) => {
  const { setUser, setIsAuth } = UserData();

  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.clear();
    setUser(null);
    setIsAuth(false);
    navigate("/login");
    toast.success("user logged out successfully");
  };
  
  

  return (
    <div>
      {user && (
        <div className="profile">
          <h2>My Profile</h2>
          <div className="profile-info">
            <p>
              <strong>name-{user.name}</strong>
            </p>
            <p>
              <strong>Email-{user.email}</strong>
            </p>
            <button className="common-btn">
              <MdDashboard /> Dashboard{" "}
            </button>
            <br />
            <button
              onClick={logoutHandler}
              className="common-btn"
              style={{ background: "red" }}
            >
              <MdLogout />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
