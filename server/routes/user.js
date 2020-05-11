const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')

router.get('/user', userController.getSingleUser)

router.get('/users', userController.getUsers)

router.post('/signup', userController.signup)

router.post('/login', userController.login)

router.post('/logout', userController.logout)

router.delete('/delete/:userId', userController.deleteUser)

module.exports = router
