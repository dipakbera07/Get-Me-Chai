import mongoose from "mongoose";
import { models } from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username:{type:String, unique:true, required: true},
        email: { type: String, unique: true, required: true },
        password: { type: String, equired: true }
    },
    {
        timestamps: true
    }
)

const User = models?.User || mongoose.model("User",userSchema)

export default User