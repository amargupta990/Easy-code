
import express from "express"
import { getAllCourse, singleCourse,fetchLectures,fetchLecture,getMyCourses, checkout,paymentVerification } from "../controllers/course.controller.js";
import { verifyJWT } from "../middlewares/Auth.middleware.js";
const router = express.Router();

router.get("/course/all",getAllCourse)
router.get("/course/:id",singleCourse)
router.get("/lectures/:id",verifyJWT, fetchLectures)
router.get("/lecture/:id",verifyJWT, fetchLecture)
router.get("/mycourse",verifyJWT,getMyCourses)
router.post("/course/checkout/:id",verifyJWT,checkout)
router.post("/verification/:id",verifyJWT,paymentVerification)

export default router