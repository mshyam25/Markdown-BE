import User from '../models/userModel.js'
import { generateToken } from '../generateToken.js'
import expressAsyncHandler from 'express-async-handler'
import { passwordReset } from '../verifyMail.js'
import PasswordResetToken from '../models/tokenModel.js'

// Description : Get all users
// Route :  GET /users
// Access : Private auth,adminAuth

const getUsers = expressAsyncHandler(async (request, response) => {
  const users = await User.find({})
  if (users) {
    response.send(users)
  } else {
    response.status(404)
    throw new Error('Invalid request')
  }
})

// Description : User Sign in
// Route :  GET /users/signin
// Access : Public

const userSignIn = expressAsyncHandler(async (request, response) => {
  const { email, password } = request.body
  const user = await User.findOne({ email })

  if (user && (await user.passwordMatchCheck(password))) {
    response.status(200)
    response.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
      host: request.headers.host,
    })
  } else {
    response.status(404)
    throw new Error('Invalid User Credentials')
  }
})

// Description : User Sign Up
// Route :  POST /users
// Access : Public

const userRegistration = expressAsyncHandler(async (request, response) => {
  const { name, email, password } = request.body
  const userExists = await User.findOne({ email })

  if (userExists) {
    response.status(500)
    throw new Error(
      'This Email id is registered with another user. Please use a different Email id.'
    )
  } else {
    const user = await User.create({
      name,
      email,
      password,
    })
    if (user) {
      response.status(201)
      response.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      })
    } else {
      response.status(400)
      throw new Error('Invalid user data')
    }
  }
})

// Description : Find User by Email Id
// Route :  GET /users/userbyemail
// Access : Public

const getUserByEmail = expressAsyncHandler(async (request, response) => {
  const { email } = request.body
  const user = await User.findOne({ email })

  if (user) {
    response.status(200)
    response.send(user)
  } else {
    response.status(404)
    throw new Error('No Account found for this Email Id')
  }
})

// Description : Sending Password Reset Link
// Route :  GET /users/resetpasswordlink/:email
// Access : Public
const resetPasswordLink = expressAsyncHandler(async (request, response) => {
  const { email } = request.params
  const user = await User.findOne({ email })
  if (user) {
    if (passwordReset(user, request)) {
      response
        .status(200)
        .send(
          'Password Reset link is sent to your Email Id. Please check your email.'
        )
    }
  } else {
    response.status(404)
    throw new Error('No Account found for this Email Id')
  }
})

// Description : Verifying Password Reset Link
// Route :  GET /users/resetpassword/:email/:passwordResetToken
// Access : Public

const verifyResetLink = expressAsyncHandler(async (request, response) => {
  console.log('Verified link')
  const { passwordResetToken } = request.params
  const validToken = await PasswordResetToken.findOne({
    passwordResetToken: passwordResetToken,
  })
  if (validToken) {
    const user = await User.findById(validToken._userId)
    console.log('Verified link')
    console.log(user)

    const updatedToken = await PasswordResetToken.deleteOne({
      passwordResetToken: passwordResetToken,
    })
    response.redirect(`http://localhost:3000/resetpassword/${user.email}`)
  } else {
    response.status(404)

    response.send(
      'Your Password Reset link may have expired. Please try again.'
    )
  }
})

// Description : Reset Password
// Route :  PUT /users/passwordreset
// Access : Public

const resetPassword = expressAsyncHandler(async (request, response) => {
  const { email, password } = request.body
  const user = await User.findOne({ email })
  if (user) {
    user.password = password
    const updatedUser = await user.save()
    response.send('Password Updated.Please Sign in with your new password')
  } else {
    response.status(404)
    throw new Error('User not found')
  }
})

// Description Update user details
// Route       PUT /users/profile
//@access      Private Auth

const updateUserDetails = expressAsyncHandler(async (request, response) => {
  const { name, email, password } = request.body
  const user = await User.findById(request.user._id)
  if (user) {
    user.name = name || user.name
    user.email = email || user.email
    if (password) {
      user.password = password
    }
    const updatedUser = await user.save()
    response.send({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    })
  } else {
    response.status(404)
    throw new Error('User not found')
  }
})

export {
  userSignIn,
  getUsers,
  userRegistration,
  resetPasswordLink,
  verifyResetLink,
  getUserByEmail,
  resetPassword,
  updateUserDetails,
}
