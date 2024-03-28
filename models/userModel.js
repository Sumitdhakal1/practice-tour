const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const catchAsync = require('../utils/catchAsync')
const userSchema = mongoose.Schema({
    name:{
       type:String,
       required:[true, 'this field cannot be empty'],
       unique:true
    },
    email:{
        type:String,
        required:[true,'this field cannot be empty'],
        unique:true,
        lowercase:true,
        validate:[validator.isEmail]
    },
    password:{
        type:String,
        required:[true,'please provide your password'],
        minlength:8,
        select:false
    },
    passwordConfirm:{
        type:String,
        required:[true,'please confirm your password'],
        validate:{
            validator: function(el){
                return el === this.password
            },
            message:"password does not match"
        }

    }
})


userSchema.pre('save', async function(next){
 if(!this.isModified('password'))return next();

this.password = await bcrypt.hash(this.password,12);

this.passwordConfirm = undefined;
next();

});

// module.exports.comparePassword = catchAsync(async(candidatePassword, userPassword)=>{
//     return await bcrypt.compare(candidatePassword, userPassword)
// })


// userSchema.methods.correctPassword = async function(
//     candidatePassword,
//     userPassword
  
//   ) 
//   {
//     return await bcrypt.compare(candidatePassword, userPassword);
//   };



const User = mongoose.model('user', userSchema);

module.exports=User