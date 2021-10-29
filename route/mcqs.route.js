const express =require('express')
const mcqController = require('../controllers/mcq.controller')
const router = express.Router()

router.route('/api/mcq').post(mcqController.create)
router.route('/api/mcq/random').get(mcqController.random)
module.exports =router
