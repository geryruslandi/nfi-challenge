import TransactionController from '@controllers/admin/AdminTransactionController'
import express from 'express'

const router = express.Router()

const controller = new TransactionController()

router.post('/deposit', controller.deposit as any)

router.post('/withdraw', controller.withdraw as any)

export default router
