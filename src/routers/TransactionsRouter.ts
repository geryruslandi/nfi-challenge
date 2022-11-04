import TransactionController from '@controllers/TransactionController'
import { jwtAuthMiddleware } from '@src/utils/Passport'
import express from 'express'

const router = express.Router()

router.use(jwtAuthMiddleware)

const controller = new TransactionController()

router.post('/deposit', controller.deposit as any)

router.post('/withdraw', controller.withdraw as any)

export default router
