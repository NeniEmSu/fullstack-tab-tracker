const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')
const User = require('../models/usersModel')

const signToken = (user) => {
  return jwt.sign(
    {
      iss: process.env.BASE_URL,
      userId: user._id,
      picture: 'https://github.com/nuxt.png',
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '24h',
    }
  )
}

exports.signup = async (req, res, next) => {
  try {
    const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds)

    const user = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: hashedPassword,
    })
    const newUser = await user.save()

    const token = signToken(newUser)
    res.status(201).json({
      type: 'success',
      message: 'User registration successfull!',
      newUser,
      token,
    })
  } catch (error) {
    res.status(500).json({
      type: 'error',
      error,
    })
  }
}

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'userName email createdAt').sort({
      createdAt: -1,
    })

    res.status(200).json({
      type: 'success',
      users,
    })
  } catch (error) {
    res.status(500).json({ type: 'error', error })
  }
}

exports.login = (req, res, next) => {
  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (!user) {
        return res.status(403).json({
          type: 'error',
          error: 'User email not found, correct it or consider signing up',
        })
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(403)
              .json({ type: 'error', error: 'Incorrect password!' })
          }
          const token = signToken(user)
          res.status(200).json({
            message: 'Logged in successfully!',
            type: 'success',
            userId: user._id,
            token,
          })
        })
        .catch((error) => {
          res.status(500).json({
            type: 'error',
            error,
          })
        })
    })
    .catch((error) => {
      res.status(500).json({
        type: 'error',
        error,
      })
    })
}

exports.getSingleUser = async (req, res) => {
  try {
    const token = req.headers.authorization
    if (!token)
      return res
        .status(401)
        .json({ type: 'error', error: 'Authorization token not found' })

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findOne({ _id: decoded.userId })
    if (!user)
      return res.status(403).json({ type: 'error', error: 'User not found' })

    const convertedEmailToName = user.email.match(/^([^@]*)@/)[1]

    const userDetails = {
      id: user._id,
      email: user.email,
      picture: decoded.picture,
      name: convertedEmailToName,
      userName: user.userName,
    }
    res.status(200).json({ type: 'success', user: userDetails })
  } catch (error) {
    res.status(500).json({ type: 'error', error })
  }
}

exports.logout = (req, res) => {
  try {
    res
      .status(200)
      .json({ type: 'success', message: 'Loged Out Successfully!' })
  } catch (error) {
    res.status(500).json({ type: 'error', error })
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.userId
    const result = await User.deleteOne({ _id: id })
    res.status(200).json({ type: 'success', result })
  } catch (error) {
    res.status(500).json({ type: 'error', error })
  }
}
