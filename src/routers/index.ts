import express, { NextFunction, Request, Response } from 'express'
import AuthRouter from '@routers/AuthRouter'
import TransactionRouter from '@routers/TransactionsRouter'
import { jsonResponseMessageError } from '@src/utils/Helpers'

const router = express.Router()

router.use('/auth', AuthRouter)
router.use('/transactions', TransactionRouter)

export default router
