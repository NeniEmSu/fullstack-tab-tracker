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
    userName: {
      type: String,
      unique: true,
      required: true,
    },
    password: { type: String, required: true },
    songs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song',
      },
    ],
  },
  { timestamps: true }
)

userSchema.plugin(uniqueValidator)

const User = mongoose.model('user', userSchema)
module.exports = User
