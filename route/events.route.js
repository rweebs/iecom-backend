const express =require('express')
const competitionController = require('../controllers/event.controller')
const router = express.Router()
/**
 * @swagger
 * /api/users:
 *      post:
 *          description: Use to create users
 *          responses:
 *              '200':
 *                      description:'successfull response'
 * 
 * 
 */
 router.route('/api/event').post(competitionController.create)
module.exports =router
