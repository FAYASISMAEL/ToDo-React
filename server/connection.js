import mongoose from "mongoose"

export default async function connection() {
    const db = await mongoose.connect("mongodb://localhost:27017/newtodo1")
    console.log("Database Connected")
    return db    
}