import express, { Router } from 'express'
import dotenv from 'dotenv'
import { UserRouter } from './routes/UserRouter'
import { ContentRouter } from './routes/ContentRouter'
import { BrainRouter } from './routes/BrainRouter'
import cors from 'cors'
dotenv.config()

const PORT = process.env.PORT || 3000

const app = express()

app.use(cors({
    origin: 'https://secondbrain-fe.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json())
app.use('/v1/user', UserRouter)
app.use('/v1/content', ContentRouter)
app.use('/v1/brain', BrainRouter)

app.get('/', (req, res) => {
    res.status(200).json({
        message: "BigBrain backend - By Suleman"
    })
})
app.listen(PORT, () => {
    console.log("Server on http://localhost:" + PORT)
})