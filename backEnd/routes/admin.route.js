
import express from "express"
import { addLecture, createCourse, deleteCourse, deleteLecture, getAllStats } from "../controllers/admin.controller.js";
import { isAdmin, verifyJWT } from "../middlewares/Auth.middleware.js";
import { upload} from "../middlewares/multer.middleware.js";
const router = express.Router();

router.post("/course/new", verifyJWT,isAdmin, upload.fields([
    {
        name: "image",
        maxCount: 1
    }, 
    
]), createCourse)
router.post("/course/:id",verifyJWT,isAdmin,upload.single('video'),addLecture)
router.delete("/course/:id",verifyJWT,isAdmin,deleteCourse)
router.delete("/lecture/:id",verifyJWT,isAdmin,deleteLecture)
router.get("/stats",verifyJWT,isAdmin,getAllStats)


export default router