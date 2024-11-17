import express, { Router } from 'express'
import dotenv from 'dotenv'
import { UserRouter } from './routes/UserRouter'
import { ContentRouter } from './routes/ContentRouter'
dotenv.config()

const PORT = process.env.PORT || 3000

const app = express()
app.use(express.json())
app.use('/v1/user', UserRouter)
app.use('/v1/content', ContentRouter)

app.listen(PORT, () => {
    console.log("Server on http://localhost:" + PORT)
})