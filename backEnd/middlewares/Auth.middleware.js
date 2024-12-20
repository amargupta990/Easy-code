import ApiError from "../utils/ApiError.js";
import  asyncHandler  from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async(req, _, next) => {
    try {
        const token = req.headers.token;
        
        // console.log(token);
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }
    
        const decodedData = jwt.verify(token, process.env.REFRESHTOKENSEC)
    
        req.user = await User.findById(decodedData?._id).select("-password ")
    
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
    
})

export const isAdmin = (req , res , next)=>{
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({message:"you are not admin"})
        }
        next()
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}