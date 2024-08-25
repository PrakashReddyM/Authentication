import express from 'express'
import { login, logout, singup, verifyEmail } from '../Controllers/userController.js'
const router = express.Router()

router.route('/signup').post(singup)
router.route('/login').post(login)
router.route('/logout').get(logout)


router.route('/verify-email').post(verifyEmail)

export default router;