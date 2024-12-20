import asyncHandler from "../utils/asyncHandler.js";
import {Course} from "../models/course.model.js"
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/Apiresponse.js";
import { uploaderOnCloudinary } from "../utils/cloudinary.js";
import { Lecture } from "../models/lecture.model.js";
import {rm} from "fs"
import {promisify} from "util"
import fs from "fs"
import { User } from "../models/user.model.js";
import { upload } from "../middlewares/multer.middleware.js";


const createCourse = asyncHandler(async(req,res)=>{
    const {title , description , category , createdBy , duration , price} = req.body
    const  imageLocalPath = req.files.image?.[0]?.path
    console.log(req.files.image?.[0]);
    
    if (!imageLocalPath) {
        throw new ApiError(400, "image not found")
    }
    const uploadimgOnCloud = await uploaderOnCloudinary(imageLocalPath)
    console.log("upload on cloud",uploadimgOnCloud);
    
    if (!uploadimgOnCloud) {
        throw new ApiError(400, "file uploading failed")
    }
    const course = await Course.create({
        title,
        description,
        category,
        createdBy,
        duration,
        price,
        image:uploadimgOnCloud?.url
    })

    res.status(201).json(new ApiResponse(201, course , "course created successfully"))
})

const addLecture = asyncHandler(async(req, res)=>{
   
      
    const course = await Course.findById(req.params.id)
    

    if (!course) {
        throw new ApiError(404 , "course not found")
    }
    const {title , description} = req.body

    
    const videoFileLocalPath = req.file?.path;

    
    if (!videoFileLocalPath) {
        throw new ApiError(404 , "videolocalPath not found")
    }
    const uploadedVideo =  await uploaderOnCloudinary(videoFileLocalPath)
    console.log("uploadedVideo",uploadedVideo.url);
    
    if (!uploadedVideo) {
        throw new ApiError(404 , "video not uploaded")
    }
     
    const lecture = await Lecture.create({
        title,
        description,
        video:uploadedVideo?.url,
        course:course._id,

    })
    res.status(201).json(new ApiResponse(201 , lecture , "lecture uploaded successfully "))
})

const deleteLecture = asyncHandler(async(req,res)=>{
    const lecture = await Lecture.findById(req.params.id)
    rm(lecture.video,()=>{
        console.log("video delted");
        
    })
    await lecture.deleteOne()
    res.status(201).json(new ApiResponse(201,{},"deleted.."))
})

const unlinkAsync = promisify(fs.unlink)

const deleteCourse = asyncHandler(async(req,res)=>{
     const course = await Course.findById(req.params.id)
     const lecture = await Lecture.find({course:course._id})
     await Promise.all(
        lecture.map(async(lecture)=>{
            await unlinkAsync(lecture.video)
            console.log("video deleted");
        })
     )
     rm(course.image,()=>{
        console.log("image deleted");
     })
     await Lecture.find({course:req.params.id}).deleteMany()
     await course.deleteOne()
     await User.updateMany({},{$pull:{subscription:req.params.id}})
     res.status(201).json(new ApiResponse(201,{},"course deleted " ))
})

const getAllStats = asyncHandler(async(req,res)=>{
    const totalCourse =(await Course.find()).length;
    const totalLecture =(await Lecture.find()).length;
    const totalUser =(await User.find()).length;
    const stats = {
        totalCourse,
        totalLecture,
        totalUser
    }
    res.status(201).json(new ApiResponse(201,stats,"stats fetched successfully"))
})






export {createCourse , addLecture, getAllStats,deleteLecture,deleteCourse}