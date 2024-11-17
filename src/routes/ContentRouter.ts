import { Request, Response, Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";

export const ContentRouter = Router()

ContentRouter.get('/', authMiddleware, (req: Request, res: Response) => {
    res.status(200).json({
        // @ts-ignore
        message: req.userId
    })
})