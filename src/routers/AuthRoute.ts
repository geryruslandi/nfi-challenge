import RegistrationController from '@src/controllers/RegistrationController'
import express from 'express'

const router = express.Router()

const registrationController = new RegistrationController()

router.post('/registration', registrationController.store)

export default router
