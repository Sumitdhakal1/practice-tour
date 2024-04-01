const User = require('../models/userModel')
const factory = require('./handlerFactory')
 const catchAsync = require('../utils/catchAsync') 

exports.getMe = (req, res, next)=>{
  req.params.id =  req.user.id
    next()
}

exports.updateMe = catchAsync(async(req, res, next)=>{

  const filteredBody = filterObj(req.body , 'name', 'email')

  const updateUser = await User.findByIdAndUpdate(req.user.id, filteredBody,{
    new:true,
    runValidation:true
  })

  res.status(200).json({
    status:'success',
    data:{
      user:updateUser
    }
  })
})

exports.getAllUser= factory.getAll(User)

exports.getUser = factory.getOne(User)

//do not update password with this
exports.deleteUser = factory.deleteOne(User)
exports.updateUser = factory.updateOne(User)


// exports.getMe = catchAsync(async(req, res, next) => {
//     const userId = req.user.id;
//     const userData = await User.findById(userId)
  
//     res.status(200).json({
//       status:'success',
//       data:userData
//     })  
//   });


// exports.getAllUser =catchAsync(async(req, res, next)=>{ 
//     const user =await User.find(req.params)

//     res.status(200).json({
//         status:"success",
//         data:{
//             user
//         }
//     })
// })

