import mongoose, {Schema} from "mongoose";

const courseSchmea = new Schema(
    {
        title: {
            type: String,
            required: true,
          
        },
        description: {
            type: String,
            required: true,
           
           
        },
        image: {
            type: String,
            required: true,
           
        },
        price: {
            type: String, 
            default :"user"
        },
        duration: {
            type: String, 
            default :"user"
        },
        category: {
            type: String, 
            default :"user"
        },
       
        createdBy: {
            type: String, 
            default :"user"
        },
    },
    {
        timestamps: true
    }
)




export const Course = mongoose.model("Course", courseSchmea)