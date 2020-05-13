const jwt = require('jsonwebtoken')
const User = require('../models/usersModel')

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findOne({ _id: decodedToken.userId })
    if (!user) {
      return res
        .status(400)
        .json({ type: 'error', error: 'Invalid user credentials' })
    } else {
      next()
    }
  } catch (error) {
    res.status(401).json({
      type: 'error',
      error: 'Unauthorized access!',
    })
  }
}
