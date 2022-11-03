import express from 'express'
import AuthRouter from '@routers/AuthRoute'

const router = express.Router()

router.use('/auth', AuthRouter)

export default router
