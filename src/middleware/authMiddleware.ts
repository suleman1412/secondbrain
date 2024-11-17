import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const authMiddleware = (req:Request , res: Response, next: NextFunction) => {
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