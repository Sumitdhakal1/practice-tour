const Review = require('../models/reviewModel')
const factory = require('./handlerFactory')
// const catchAsync = require('../utils/catchAsync')

// exports.setFilter = catchAsync(async(req,res, next)=>{
//     let filter= {}
//     if(req.params.tourId) filter = {tour:req.params.tourId}    
//     next()
// })

exports.getAllReview = factory.getAll(Review)

exports.setTourUserId = (req, res, next)=>{
    if(!req.body.tour) req.body.tour =req.params.tourId
    if(!req.body.user) req.body.user = req.params.id
    next();
}

exports.getReview = factory.getOne(Review)
exports.createReview = factory.createOne(Review)
exports.deleteReview = factory.deleteOne(Review)
exports.updateReview = factory.updateOne(Review)


// exports.getAllReviews=catchAsync(async(req, res)=>{
//        let filter= {}
//     if(req.params.tourId) filter = {tour:req.params.tourId}    
//     const review = await Review.find(filter)

//     res.status(200).json({
//         status:'success',
//         result:review.length,
//         data:{
//             review
//         }
//     })

// })

// exports.createReview = catchAsync(async(req, res)=>{
//     if(!req.body.tour) req.body.tour =req.params.tourId
//     if(!req.body.user) req.body.user = req.params.id

//     const NewReview= await Review.create(req.body)

//     res.status(200).json({
//         status:'success',
//         data:{
//            review: NewReview
//         }
//     })
// })
