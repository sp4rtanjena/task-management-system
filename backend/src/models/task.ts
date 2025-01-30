import { model, Schema } from "mongoose"

const taskSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    todo: { type: String, required: true },
    isCompleted: { type: Boolean, default: false }
})

const Task = model("Task", taskSchema)

export default Task