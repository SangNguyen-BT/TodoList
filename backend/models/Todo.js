import mongoose, { mongo } from "mongoose";

const todoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    text: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
}, {timestamps: true})

const TodoModel = mongoose.model("todo", todoSchema)

export default TodoModel