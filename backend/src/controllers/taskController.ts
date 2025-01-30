import { Request, Response } from "express"
import Task from "../models/task"

// Create a new task
export const createTask = async (req: Request, res: Response) => {
    const { todo } = req.body
    const userId = req.userId
    try {
        const newTask = new Task({ userId, todo })
        await newTask.save()
        return res.status(201).json({ message: "Task created successfully" })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Internal server error" })
    }
}

// Get all tasks
export const getTasks = async (req: Request, res: Response) => {
    const userId = req.userId
    try {
        const tasks = await Task.find({ userId })
        return res.status(200).json(tasks)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Internal server error" })
    }
}

// Update a task
export const updateTask = async (req: Request, res: Response) => {
    const { id, todo } = req.body
    try {
        const updateTask = await Task.findByIdAndUpdate({ _id: id, userId: req.userId }, { todo }, { new: true })
        if (!updateTask) return res.status(404).json({ message: "Task not found" })
        return res.status(200).json({ message: "Task updated successfully", task: updateTask })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Internal server error" })
    }
}

// Delete a task
export const deleteTask = async (req: Request, res: Response) => {
    const { id } = req.body
    try {
        const deletedTask = await Task.findOneAndDelete({ _id: id, userId: req.userId })
        if (!deletedTask) return res.status(404).json({ message: "Task not found" })
        return res.status(200).json({ message: "Task deleted successfully" })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Internal server error" })
    }
}