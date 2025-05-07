import mongoose from "mongoose"

const todoSchema = new mongoose.Schema({
    task: {type: String, required: true},
    status: {type: Boolean, default: false},
    date: {type: Date, default: Date.now()}
})

export default mongoose.model.Todos || mongoose.model("Post",todoSchema)