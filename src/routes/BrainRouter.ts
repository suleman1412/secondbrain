import { Request, Response, Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";

export const BrainRouter = Router()

BrainRouter.post("/share", (req:Request, res:Response) => {

})

BrainRouter.get("/:shareLink", (req:Request, res:Response)  => {

})