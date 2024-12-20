
import asyncHandler from "../utils/asyncHandler.js"
import Apiresponse from "../utils/Apiresponse.js"
import ApiError from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import bcrypt from 'bcrypt';

import jwt from "jsonwebtoken"
import sendMail from "../middlewares/sendMail.middleware.js"

const userResister =  asyncHandler(async(req,res)=>{
      const {name , email, password}= req.body
      console.log(req.body);
      
      
      if (!password) {
            throw new ApiError(400,"please enter password")
      }
      let user = await User.findOne({email})
      if (user) {
         throw new ApiError(400,"user exists..")
      }
      // hash the password
      const hashpassword = await bcrypt.hash(password,10)
      user = {
       name ,
       email,
       password:hashpassword
      }
      // otp feneration 
      const otp = Math.floor(Math.random()*1000000)
      const activationToken =jwt.sign({
       user,
       otp,
      },process.env.ACTIVATION_SECRET,{
         expiresIn:"5m"
      })
      const data = {
       name ,
       otp,
      }
      await sendMail(
       email,
       "Easy Code",
       data
      )
      res.status(200).json(new Apiresponse(200,activationToken,"otp send to your mail"))
 })
    

const verifyUser = asyncHandler(async (req,res)=>{
      const {otp , activationToken} = req.body
      console.log(req.body);
      
      const verify = jwt.verify(activationToken ,process.env.ACTIVATION_SECRET)

      if (!verify) {
          throw new ApiError(400, "otp expired..")    
      }

      if(verify.otp != otp){
            throw new ApiError(400, "wrong otp")
      }
      await User.create({
            name:verify.user.name,
            email:verify.user.email,
            password:verify.user.password,
      })
       res.status(200).json(new Apiresponse(200,"user Resistered"))
})

const loginUser = asyncHandler(async(req , res)=>{
      const {email , password} = req.body 
      const user = await User.findOne({email})
      if (!user) {
            throw new ApiError(400, "user not found")
      }
      
      const matchPassword = await bcrypt.compare(password, user.password);

       if (!matchPassword) {
            throw new ApiError(400 , "wrong password")
       }
       const token = jwt.sign({_id : user._id},process.env.REFRESHTOKENSEC,{expiresIn:"15d"})
       res.status(200).json(new Apiresponse(200,user,"user logged in succesfully",token))
})


const getUserProfile = asyncHandler(async (req, res) => {
      const profile = await User.findById(req.user._id);
      res.status(200).json(new Apiresponse(200, profile, "Profile fetched successfully"));
    });

export {userResister , verifyUser, loginUser ,getUserProfile}