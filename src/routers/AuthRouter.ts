import LoginController from '@controllers/LoginController'
import RegistrationController from '@src/controllers/RegistrationController'
import express from 'express'

const router = express.Router()

const registrationController = new RegistrationController()
const loginController = new LoginController()

router.post('/registration', registrationController.store)

router.post('/login', loginController.store)

export default router
