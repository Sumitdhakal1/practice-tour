const mongoose = require('mongoose')

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
    startDates:[Date]

})

const Tour= mongoose.model('Tour-practice', tourSchema)

module.exports=Tour