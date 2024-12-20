import React, { useState } from 'react'
import './auth.css';
import { Link, useNavigate } from 'react-router-dom';
import { UserData } from '../../context/UserContext';

const Verify = () => {
  const [otp , setotp]=useState("")
  const navigate = useNavigate()
  const {btnLoading , verifyOtp}=UserData()
  
  const submithandler=async (e)=>{
      e.preventDefault()
    await verifyOtp(Number(otp),navigate)
  }
  return (
    <div className='auth-page'>
        <div className='auth-form'>
            <h2>Verify Account</h2>
            <form onSubmit={submithandler}>
                <label htmlFor='otp'>Otp</label>
                <input value={otp} onChange={(e)=>setotp(e.target.value)} type='number'required />
                <button disabled={btnLoading} type='submit' className='common-btn'>{
                  btnLoading ?"please wait":"verify"
                }</button>
            </form>
            <p>go to <Link to='/login'>Login</Link> </p>
        </div>
    </div>
  )
}

export default Verify