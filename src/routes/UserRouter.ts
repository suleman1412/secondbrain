import express, { Router } from 'express'
import { z } from 'zod'
export const UserRouter = Router()

// Signup, Signin, Avatar, Updating profile etc/
UserRouter.get('/signup', async(req, res) => {
    const username = req.body;
})
