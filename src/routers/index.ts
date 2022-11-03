import express from 'express'
import AuthRouter from '@routers/AuthRouter'
import TransactionRouter from '@routers/TransactionsRouter'
import AdminTransactionRouter from '@routers/admin/AdminTransactionsRouter'

const router = express.Router()

router.use('/auth', AuthRouter)
router.use('/transactions', TransactionRouter)

router.use('/admin/transactions', AdminTransactionRouter)

export default router
