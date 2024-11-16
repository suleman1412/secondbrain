import express, { Router } from 'express'
import dotenv from 'dotenv'
import { UserRouter } from './routes/UserRouter'
dotenv.config()

const PORT = process.env.PORT || 3000

const app = express()
app.use('/v1/user', UserRouter)

app.listen(PORT, () => {
    console.log("Server on http://localhost:" + PORT)
})