import express from 'express'
import AccessController from '../../controller/access.controller.js'

const router = express.Router()

router.post('/user/login', new AccessController().login)
router.post('/user/register', new AccessController().register)
router.post('/user/logout',)
router.post('/user/forgotPassword',)
router.post('/user/resetPassword',)

export default router
