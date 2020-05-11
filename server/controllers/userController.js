const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')
const User = require('../models/usersModel')

const signToken = (user) => {
  const convertedEmailToName = user.email.match(/^([^@]*)@/)[1]
  return jwt.sign(
    {
      iss: 'NeniEmsu',
      userId: user._id,
      userEmail: user.email,
      picture: 'https://github.com/nuxt.png',
      name: convertedEmailToName,
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
      email: req.body.email,
      password: hashedPassword,
    })
    const newUser = await user.save()

    const token = signToken(newUser)
    res.status(201).json({
      message: 'User added successfully!',
      newUser,
      token,
    })
  } catch (error) {
    res.status(500).json({
      error,
    })
  }
}

exports.getUsers = async (req, res) => {
  try {
    const user = await User.find()
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err)
  }
}

exports.login = (req, res, next) => {
  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          error: new Error('User not found!'),
        })
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({
              error: new Error('Incorrect password!'),
            })
          }
          const token = signToken(user)
          res.status(200).json({
            userId: user._id,
            token,
          })
        })
        .catch((error) => {
          res.status(500).json({
            error,
          })
        })
    })
    .catch((error) => {
      res.status(500).json({
        error,
      })
    })
}

exports.getSingleUser = async (req, res) => {
  try {
    const token = req.headers.authorization
    if (!token)
      return res
        .status(400)
        .json({ type: 'error', message: 'Authorization token not found' })

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findOne({ _id: decoded.userId })
    if (!user)
      return res.status(400).json({ type: 'error', message: 'User not found' })

    const userDetails = {
      id: decoded.userId,
      email: decoded.userEmail,
      picture: decoded.picture,
      name: decoded.name,
    }
    res.status(200).json({ user: userDetails })
  } catch (err) {
    res.status(500).json(err)
  }
}

exports.logout = (req, res) => {
  try {
    res.status(200).json('ok')
  } catch (err) {
    res.status(500).json(err)
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.userId
    const result = await User.deleteOne({ _id: id })
    res.status(200).json(result)
  } catch (err) {
    res.status(500).json(err)
  }
}
