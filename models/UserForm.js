import mongoose from "mongoose";
import { Schema, models } from "mongoose";


const UserFormSchema = new Schema(
    {
        name:{type:String, required:true},
        username:{type:String, required:true},
        profilePic:{type:String, required:true},
        coverPic:{type:String, required:true},
        razorpayId:{type:String, required:true},
        razorpaySecret:{type:String, required:true},

    },{
        timestamps:true
    }
)

const UserForm = models?.UserForm || mongoose.model("UserForm",UserFormSchema)

export default UserForm