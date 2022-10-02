const express = require('express')
const router = express.Router()
const {verifyToken, verifyTokenAndAuthorization} = require('../middleware/auth')
const userCtrl = require('../controllers/user')


router.post('/signup', userCtrl.signup)
router.post('/login', userCtrl.login)
router.put('/:id', verifyTokenAndAuthorization, userCtrl.modify)
router.delete('/:id', verifyTokenAndAuthorization, userCtrl.delete)

module.exports = router