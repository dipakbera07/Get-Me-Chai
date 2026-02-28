import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI
if(!MONGODB_URI){
    throw new Error("Error to get MongoDB uri")
}
let cached = global.mongoose;

if(!cached){
    cached = global.mongoose = {conn: null, promise: null}
}

const dbConnect = async() =>{
    if(cached.conn){
        return cached.conn
    }

    if(!cached.promise){
        cached.promise = mongoose.connect(MONGODB_URI)
    }
    try {
        cached.conn = cached.promise
    } catch (error) {
        throw new Error("Failed to connect DB: ",error)
    }
    console.log("connected")

    return cached.conn
}

export {dbConnect}

