import express from 'express'
import {
  getUserByEmail,
  getUsers,
  resetPassword,
  resetPasswordLink,
  updateUserDetails,
  userRegistration,
  userSignIn,
  verifyResetLink,
} from '../controller-functions/userController.js'
import { auth } from '../middleware/auth.js'

const router = express.Router()

// /users
router.route('/').post(userRegistration).get(getUsers)
router.route('/signin').post(userSignIn)
router.route('/profile').post(auth, getUserByEmail).put(auth, updateUserDetails)
router.route('/userbyemail').post(getUserByEmail)
router.route('/resetpasswordlink/:email').get(resetPasswordLink)
router.route('/resetpassword/:email/:passwordResetToken').get(verifyResetLink)
router.route('/passwordreset').put(resetPassword)

export const userRouter = router
