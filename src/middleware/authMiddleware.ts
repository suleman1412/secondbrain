import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const authMiddleware = (req:Request , res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: "Authorization header missing or invalid" });
    }

    const token = authHeader!.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        // @ts-ignore
        req.userId = decoded.id; 
        next();
    } catch (error) {
        res.status(403).json({ message: "Cannot verify user. Token rejected" });
    }
}