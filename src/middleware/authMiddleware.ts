import express, {Request, Response, NextFunction} from 'express'
import { AuthSchema } from '../types/Schemas';
import jwt, { JwtPayload } from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const authMiddleware = (req:Request , res: Response, next: NextFunction) => {
    const { success, data, error } = AuthSchema.safeParse(req.body)
    if(!success){
        res.status(411).json({
            message: "Error in inputs",
            errors: error.errors
        });
    } else{
        const authHeader = req.headers['authorization']
        const decoded = jwt.verify(authHeader as string, process.env.JWT_SECRET!)
        if(decoded){
            // @ts-ignore
            req.userId = decoded.id;
            next()
        }else{
            res.status(403).json({
                message: "Cannot verify user. Token rejected"
            })
        }
    }


}