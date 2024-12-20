import mongoose, {Schema} from "mongoose";

const lectureSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
          
        },
        description: {
            type: String,
            required: true,
           
           
        },
        video: {
            type: String,
            required: true,
           
        },
        course: {
            type: Schema.Types.ObjectId, 
            ref:"Course",
            required:true
        },

    },
    {
        timestamps: true
    }
)




export const Lecture = mongoose.model("Lecture", lectureSchema)