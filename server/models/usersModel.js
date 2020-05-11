const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      index: true,
      unique: true,
      required: true,
      lowercase: true,
    },
    password: { type: String, required: true },
  },
  { timestamps: true }
)

userSchema.plugin(uniqueValidator)

const User = mongoose.model('user', userSchema)
module.exports = User
