import mongoose, {Schema} from "mongoose";


const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
          
        },
        email: {
            type: String,
            required: true,
            unique: true,
           
        },
        password: {
            type: String,
            required: true,
           
        },
        role: {
            type: String, 
            default :"user"
        },
       
        subscription: [
            {
                type: Schema.Types.ObjectId,
                ref: "Course"
            }
        ],
       

    },
    {
        timestamps: true
    }
)


export const User = mongoose.model("User", userSchema)