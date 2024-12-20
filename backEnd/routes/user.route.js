import  { Router } from "express"
import {  loginUser, userResister,verifyUser,getUserProfile } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/Auth.middleware.js";

const router = Router();


router.post("/user/resister",userResister)
router.post("/user/verify",verifyUser)
router.post("/user/login",loginUser)
router.get("/user/me",verifyJWT, getUserProfile)








export default router