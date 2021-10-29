const express =require('express')
const competitionController = require('../controllers/competition.controller')
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
 router.route('/api/competition').post(competitionController.create)
 router.route('/api/competition').patch(competitionController.update)
 router.route('/api/competition').put(competitionController.get)
module.exports =router
