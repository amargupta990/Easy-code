import express from "express"
import dotenv from "dotenv"
import connectDB from "./database/db.js";
import cookieParser from "cookie-parser";
import Razorpay from "razorpay"
import cors from "cors"

dotenv.config()

 export const instance = new Razorpay({
        key_id:process.env.PAY_ID,
        key_secret:process.env.PAY_SECRET_KEY,
})

const app = express()
app.use(cors())
const port =process.env.PORT;

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true
}))
app.use(express.static("public"))
app.use(cookieParser())



app.get('/',(req,res)=>{
    res.send("server started")
})
//importing routes
import userRoutes from "./routes/user.route.js"
import { verifyJWT } from "./middlewares/Auth.middleware.js";
import courseRoute from "./routes/course.route.js"
import adminRoute from "./routes/admin.route.js"

//using routes
app.use("/api", userRoutes)
app.use("/api",courseRoute)
app.use("/api",adminRoute)




connectDB()
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
    
})
