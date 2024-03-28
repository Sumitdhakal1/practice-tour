const User = require('../models/userModel')
const AppError = require('../utils/appError')
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync')
const bcrypt = require('bcrypt')
const { promisify } = require('util');

const signToken = id =>{
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN
    })
}

const createSendToken =(user, statusCode, res)=>{
    const token =signToken(user._id);

    user.password = undefined

    res.status(200).json({
        status:'success',
        token,
        data:{
            user
        }
    })
}

exports.signup = catchAsync(async(req , res ,next)=>{
  const newUser = await User.create({
    name: req.body.name,
    email:req.body.email,
    password:req.body.password,
    passwordConfirm:req.body.passwordConfirm
  })

  res.status(200).json({
    status:'success',
    data:{
    user:newUser
    }
  })

})

exports.login = catchAsync(async(req,res, next)=>{
    const {email, password} = req.body;
    
    if(!email || !password){
        return(next(new AppError('please provide email and password')))
    }

    const user = await User.findOne({email}).select('+password')    
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return next(new AppError('Incorrect email or password', 401));
    }
createSendToken(user, 200 ,res)
 
})

exports.protect = catchAsync(async(req ,res ,next)=>{
    let token; 
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }
  
    if (!token) {
      return next(
        new AppError('You are not logged in! Please log in to get access.', 401)
      );
    }

    console.log(token)

    const decode = await promisify(jwt.verify)(token , process.env.JWT_SECRET);

    const currentUser = await User.findById(decode.id);
    if(!currentUser){
        return(next(new AppError('the user belonging to this token does not exits', 400)))
    }

    req.user = currentUser;
    next()
})