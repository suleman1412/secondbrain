import { json, Request, Response, Router } from 'express'
import { number, z } from 'zod'
import { SignupSchema } from '../types/Schemas'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { UsersModel } from '../db/db'
import bcrypt from 'bcrypt'

dotenv.config()

mongoose.connect(process.env.MONGO_URL!)

export const UserRouter = Router()

// Encryption
const salt_rounds = Number(process.env.SALT_ROUNDS) || 3;

// Signup, Signin
UserRouter.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        message: "UserRoutes"
    })
})

UserRouter.post('/signup', async(req: Request, res: Response) => {
    try{
        const { success, data, error } = SignupSchema.safeParse(req.body)
        if(!success){
            res.status(411).json({
                message: "Error in inputs",
                errors: error.errors
            });
        }
        else{
            const hashPass = await bcrypt.hash(data.password, salt_rounds)
           
            await UsersModel.create({
                username: data.username,
                password: hashPass
            })
            res.status(200).json({
                message: "User Created in DB"
            })
        }
    } catch(error){
        // @ts-ignore
        if(error.code === 11000){
            res.status(403).json({
                message: "User already exists with this username, please pick another."
            })
        }
        else{
            res.status(500).json({
                message: "Internal Server Error."
            })
        }
    }
    
})
