const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')

const auth = require('../middleware/auth')

const authValidation = require('../middleware/authValidation')

router.get('/user', userController.getSingleUser)

router.get('/users', auth, userController.getUsers)

router.post(
  '/signup',
  authValidation.validationMiddleware,
  userController.signup
)

router.post('/login', authValidation.validationMiddleware, userController.login)

router.post('/logout', userController.logout)

router.delete('/delete/:userId', userController.deleteUser)

module.exports = router
