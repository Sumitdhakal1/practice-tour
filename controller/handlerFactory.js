const catchAsync = require("../utils/catchAsync");
const Tour = require('../models/tourModels')
const AppError = require('../utils/appError')
exports.deleteOne = Model =>catchAsync(async(req, res, next)=>{
  const doc = await Model.findByIdAndDelete(req.params.id)

  if(!doc){
    return (next(new AppError('no document found with this tour id', 400)))
  }

  res.status(204).json({
    status:'success',
    data:null
  })
})

exports.updateOne = Model => catchAsync(async(req,res,next)=>{
    const doc = await Model.findByIdAndUpdate(req.params.id ,req.body,{
        new:true,
        runValidation
    })
    if(!doc){
      return (next(new AppError('no document found with this tour id', 400)))
    }

    res.status(200).json({
      status:'success',
      data:{
       data: doc
      }
    })

})

exports.createOne = Model => catchAsync(async(req, res , next)=>{
  const doc =await Model.create(req.body)
 
  if(!doc){
    return (next(new AppError('no document found with this tour id', 400)))
  }

  res.status(200).json({
    status:'success',
    data:{
      data:doc
    }
  })

})

exports.getOne =(Model, popOptions)=> catchAsync(async(req, res)=>{
  let query =   Model.findById(req.params.id)
  if(popOptions) query = query.populate(popOptions)
  const doc = await query;

  // const doc = await Model.findById(req.params.id).populate({path:'review'})

  if(!doc){
    return (next(new AppError('no document found with this tour id', 400)))
  }

      res.status(200).json({
          status:'success',
          data:{
              data:doc
          }
      })

})

exports.getAll = Model => catchAsync(async(req,res)=>{
// to allow for nested GET review on tour(hack)
  let filter= {}
  if(req.params.tourId) filter = {tour:req.params.tourId}    

  const doc =await Model.find(filter, req.params)

  res.status(200).json({
      status:'success',
      data:{
          data:doc
      }
  })

});