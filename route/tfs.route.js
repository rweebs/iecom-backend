const express =require('express')
const tfController = require('../controllers/tf.controller')
const router = express.Router()

router.route('/api/tf').post(tfController.create)
router.route('/api/tf/random').get(tfController.random)
module.exports =router
