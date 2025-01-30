import express, { Request, Response } from "express"
import { register, login } from "../controllers/authController"

const authRouter = express.Router()

authRouter.post("/register", async (req: Request, res: Response) => {
    try {
        await register(req, res);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});
authRouter.post("/login", async (req: Request, res: Response) => {
    try {
        await login(req, res);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

export default authRouter