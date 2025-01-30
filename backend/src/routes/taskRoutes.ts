import express, { Request, Response } from "express"
import { createTask, getTasks, updateTask, deleteTask } from "../controllers/taskController"
import { authMiddleware } from "../middleware/authMiddleware"

const taskRouter = express.Router()

taskRouter.use(authMiddleware)
taskRouter.post("/create", async (req: Request, res: Response) => {
    try {
        await createTask(req, res)
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
})
taskRouter.get("/get", async (req: Request, res: Response) => {
    try {
        await getTasks(req, res)
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
})
taskRouter.put("/update", async (req: Request, res: Response) => {
    try {
        await updateTask(req, res)
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
})
taskRouter.delete("/delete", async (req: Request, res: Response) => {
    try {
        await deleteTask(req, res)
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
})

export default taskRouter