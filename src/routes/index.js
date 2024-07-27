import express from 'express'
import indexAccessRouter from './access/index.js'

const router = express.Router()

router.use('/api/v1', indexAccessRouter)

router.get('/hello-world', (req, res) => {
  res.send(`<h1>Hello World</h1>`)
})


export default router
