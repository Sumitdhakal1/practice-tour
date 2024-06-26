const express = require('express');
const router = express.Router()
const reviewController = require('../controller/reviewController')
const authController = require('../controller/authController')

router.route('/').get(reviewController.getAllReviews)
.post(authController.protect,reviewController.createReview)


module.exports=router