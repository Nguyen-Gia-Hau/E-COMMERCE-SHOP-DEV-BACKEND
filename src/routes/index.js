import express from 'express'
import indexAccessRouter from './access/index.js'
import { checkApiKey, checkPermissions } from '../auth/check.auth.js'

const router = express.Router()

// check apikey
router.use(checkApiKey)

// check permissions
router.use(checkPermissions('1111'))

router.use('/api/v1', indexAccessRouter)

router.get('/hello-world', (req, res) => {
  res.send(`<h1>Hello World</h1>`)
})


export default router
