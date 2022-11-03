import TransactionController from '@controllers/TransactionController'
import passport from '@src/utils/Passport'
import express from 'express'

const router = express.Router()

router.use(passport.authenticate('jwt', {session: false}))

const controller = new TransactionController()

router.post('/deposit', controller.deposit as any)

export default router
