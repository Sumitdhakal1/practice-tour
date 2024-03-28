const mongoose = require('mongoose')
// const User = require('./userModel')
const tourSchema =new mongoose.Schema({
    name:{
        type:String,
        required:[true,'this field is required'],
        unique:true
    },
    duration:{
        type:Number,
        required:[true,'this field is required']
    },
    maxGroupSize:{
        type:Number,
        required:[true,'this field is required']
    },
    difficulty:{
        type:String,
        required:[true,'this field is required'],
        enum:{
            values:['easy', 'medium', 'difficult'],
            message:'difficulty is either easy,medium or difficult'
        }
    },
    ratingAverage:{
        type:String,
        min:[1,'rating must me above 1'],
        max:[5, 'rating must be below 5'],
        set: val => Math.round(val * 10) / 10
    },
    ratingQuantity:{
        type:Number,
        default:0
    },
    price:{
        type:Number,
        required:[true,'a tour must have a price']
    },
    summary:{
        type:String,
    },
    description:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    startLocation:{
        type:{
       type:String,
       default:'Point',
       enum:['Point']
        },
        coordinate:[Number],
        address:String,
        description:String
    },
    locations:[{
        type:{
            type:String,
            default:'Point',
            enum:['Point']
        },
        coordinate:[Number],
        address:String,
        description:String,
        day:String

    }],//guides:Array,
        guides:[  //importing user from user model using ref and the user 
            {
                type:mongoose.Types.ObjectId,
                ref:'user'
            }
        ],
    startDates:[Date]

})

//embedding
// tourSchema.pre('save', async function(next){
//     const guidePromise = this.guides.map(async id=> await User.findById(id))
//     this.guides =await Promise.all(guidePromise)
//     next()
// })

const Tour= mongoose.model('Tour-practice', tourSchema)

module.exports=Tour