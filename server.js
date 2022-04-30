import express from 'express'
import dotenv from 'dotenv'
import connectToDB from './db.js'

import { errorHandler, notFound } from './middleware/error.js'
import cors from 'cors'

import { userRouter } from './routes/userRoutes.js'
import { notesRouter } from './routes/notesRoutes.js'

dotenv.config()
const app = express()
connectToDB()
app.use(express.json())
app.use(cors())
app.get('/', async (req, res) => {
  res.send('Welcome')
})

app.use('/users', userRouter)
app.use('/notes', notesRouter)
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server started in Development mode on port ${PORT}`)
})
