import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import compression from 'compression'
import cookieParser from 'cookie-parser'

import ErrorMiddleware from './Middleware/Error.js'
import AuthoriseMiddleware from './Middleware/Authorise.js'
import router from './Router/Todo.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(
  cors({ origin: JSON.parse(process.env.ORIGIN).whitelist, credentials: true })
)
app.use(compression())

mongoose.connect(
  process.env.MONGO_URL,
  JSON.parse(process.env.MONGO_CONFIG),
  (err) => {
    if (err) console.log('Mongodb Connection failed')
    else console.log('Mongodb Connection succeed!')
  }
)

app.use('/', AuthoriseMiddleware, router)
app.use(ErrorMiddleware)

app.use((req, res) => {
  res.status(400).send('No route found!')
})

app.listen(process.env.PORT)
