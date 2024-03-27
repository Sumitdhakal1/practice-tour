const Tour = require('../models/tourModels')
const catchAsync = require('../utils/catchAsync')

exports.getAllTours =catchAsync(async(req,res)=>{

    const tours =await Tour.find(req.params)

    res.status(200).json({
        status:'success',
        data:{
            tours,
        }
    })

});

exports.getTour =catchAsync(async(req, res)=>{

    const tour = await Tour.findById(req.params.id);

        res.status(200).json({
            status:'success',
            data:{
                tour
            }
        })

})

exports.createTour=(req,res)=>{
    try{
       const newTour =  Tour.create(req.body)

       res.status(200).json({
        status:'success',
        data:{
            tour:newTour
        }
       })
    }catch(err){
        console.log(err)
        res.status(500).json({
            status:'error',
            message:"internal server error"
        })
    }
}

exports.deleteTour=catchAsync(async(req,res)=>{

       await Tour.findByIdAndDelete(req.params.id)

        res.status(200).json({
            status:'success',
            data:null
            
        })

        console.log(err)
        res.status(500).json({
            status:'error',
            message:'internal server error'
        })
    
})