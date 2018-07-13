const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const UserController = require('../controllers/user')

const checkAuth = require('../middleware/auth-check')

router.post('/signup', UserController.user_signup)

router.post('/login', UserController.user_login)

router.delete('/:userId', checkAuth, UserController.user_delete)

module.exports = router
