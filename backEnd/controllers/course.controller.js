import { Course } from "../models/course.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/Apiresponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import {User} from "../models/user.model.js"
import { Lecture } from "../models/lecture.model.js";
import { instance } from "../index.js";
import crypto from "crypto"
import { Payment } from "../models/payment.model.js";

const getAllCourse = asyncHandler(async(req , res)=>{
   
    
    const course = await Course.find()
    // console.log(course);
    
    if (!course) {
        throw new ApiError(400,"courses not found")
    }
    res.status(200).json(new ApiResponse(200, course,"courses fetched succesfully"))
})

const singleCourse = asyncHandler(async(req , res)=>{
    const course = await Course.findById(req.params.id)
    if (!course) {
        throw new ApiError(400,"courses not found")
    }
    res.status(200).json(new ApiResponse(200, course,"course fetched succesfully"))
})

const fetchLectures = asyncHandler(async(req,res)=>{
    const lectures = await Lecture.find({course:req.params.id})
    const user = await User.findById(req.user._id)
    if (user.role==="admin") {
        return res.status(200).json(new ApiResponse(200,lectures,"lecture Fetched .."))
    }

    if (!user.subscription.includes(req.params.id)) {
        throw new ApiError(400,"you have not purchased the lecture")
    }
    res.status(200).json(new ApiResponse(200,lectures,"lecture fetched .."))
})

const fetchLecture = asyncHandler(async(req,res)=>{
    const lecture = await Lecture.findById(req.user._id)
    const user = await User.findById(req.user._id)
    if (user.role==="admin") {
        return res.status(200).json(new ApiResponse(200,lecture,"lecture Fetched .."))
    }

    if (!user.subscription.includes(req.params.id)) {
        throw new ApiError(400,"you have not purchased the lecture")
    }
    res.status(200).json(new ApiResponse(200,lecture,"lecture fetched .."))
})

const getMyCourses = asyncHandler(async(req,res)=>{
    const courses = await Course.find({_id:req.user.subscription})
    res.status(200).json(new ApiResponse(200,courses,"your all courses are here"))
})

const checkout = asyncHandler(async(req,res)=>{
    const user= await User.findById(req.user._id)
    const course = await Course.findById(req.params.id)
    if (user.subscription.includes(course._id)) {
        throw new ApiError(400,"already have this course")
    }
    const option ={
        amount :Number(course.price*100),
        currency:"INR",

    }
    const order = await instance.orders.create(option)
    res.status(200).json(new ApiResponse(200,order,course))
})

const paymentVerification = asyncHandler(async(req,res)=>{
    const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=req.body
    const body=razorpay_order_id+"|"+razorpay_payment_id
    const expectedsignature=crypto.createHmac("sha256",process.env.PAY_SECRET_KEY).update(body).digest("hex");
    const isAuth=expectedsignature===razorpay_signature;
    if (isAuth) {
        await Payment.create({
            razorpay_order_id,
            razorpay_order_id,
            razorpay_signature
        });
        const user=await User.findById(req.user._id)
        const course= await Course.findById(req.params.id)
        user.subscription.push(course._id)
        await user.save()
        res.status(200).json(new ApiResponse(200,{},"course purchased successfully"))
    }else{
        throw new ApiError(400,"payment failed")
    }
})

export {getAllCourse, singleCourse,fetchLectures,checkout,fetchLecture,getMyCourses,paymentVerification}