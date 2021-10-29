const express =require('express')
const fitbController = require('../controllers/fitb.controller')
const router = express.Router()

router.route('/api/fitb').post(fitbController.create)
router.route('/api/fitb/random').get(fitbController.random)
module.exports =router
