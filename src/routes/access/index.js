import express from 'express'
import AccessController from '../../controller/access.controller.js'
import { asynHandler } from '../../auth/check.auth.js'

const router = express.Router()

router.post('/user/login', asynHandler(new AccessController().login))
router.post('/user/register', asynHandler(new AccessController().register))
router.post('/user/logout',)
router.post('/user/forgotPassword',)

export default router
