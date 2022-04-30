import mongoose from 'mongoose'

const tokenSchema = mongoose.Schema({
  _userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },

  passwordResetToken: {
    type: String,
    default: '',
  },

  expireAt: {
    type: Date,
    default: Date.now,
    index: {
      expires: 86400000,
    },
  },
})

const PasswordResetToken = mongoose.model('PasswordResetToken', tokenSchema)

export default PasswordResetToken
