import express from 'express'
import dotenv from 'dotenv'
import { UserRouter } from './routes/UserRouter'
import { ContentRouter } from './routes/ContentRouter'
import { BrainRouter } from './routes/BrainRouter'
import cors from 'cors'
import { getEmbeddings } from './utils/TextEmbeddings'
import { QdrantSearch } from './utils/QdrantProcessing'
dotenv.config()

const PORT = process.env.PORT || 3000

const app = express()

app.use(cors({
    origin: ['https://secondbrain-fe.vercel.app', 'http://localhost:5173']
}))
app.use(express.json())
app.use('/v1/user', UserRouter)
app.use('/v1/content', ContentRouter)
app.use('/v1/brain', BrainRouter)

app.get('/', (req, res) => {
    // healthy
    res.status(200).json({
        message: "BigBrain backend - By Suleman"
    })
})

app.get('/embeddings', async(req, res) => {
    const data = req.body
    const embeddings = await getEmbeddings(data)
    res.status(200).json({
        embeddings
    })    
})

app.get('/search', async(req,res) => {
    const searchQuery = req.body.search
    const queryEmbeddings = await getEmbeddings(searchQuery)
    const response = await QdrantSearch(queryEmbeddings)
    res.status(200).send(response)

})

app.listen(PORT)