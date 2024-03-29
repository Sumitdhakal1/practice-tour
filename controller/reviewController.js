const Review = require('../models/reviewModel')
const catchAsync = require('../utils/catchAsync')


exports.getAllReviews=catchAsync(async(req, res)=>{
    const review = await Review.find(req.params)

    res.status(200).json({
        status:'success',
        result:review.length,
        data:{
            review
        }
    })

})

exports.createReview = catchAsync(async(req, res)=>{
    const NewReview= await Review.create(req.body)

    res.status(200).json({
        status:'success',
        data:{
           review: NewReview
        }
    })
})

