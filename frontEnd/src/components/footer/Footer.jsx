import React from 'react'
import "./footer.css"
import { FaSquareFacebook,FaTwitter } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
const Footer = () => {
  return (
    <footer>
        <div className='footer-content'>
            <p>
                &copy; 2024 your Easy-Learning platform .All rights reserved.<br/>
                Made with ❤️ <a href=''>Amar Kumar Gupta</a>
            </p>
            <div className='social-links'>
                <a href=""><FaTwitter/></a>
                <a href=""><FaSquareFacebook/> </a>
                <a href=""><FaSquareInstagram/> </a>
            </div>
        </div>
    </footer>
  )
}

export default Footer