const express =require('express')
const userController = require('../controllers/users.controller')
const router = express.Router()

router.route('/api/users')
    .post(userController.create)
router.post('/api/login',userController.login)
module.exports =router
