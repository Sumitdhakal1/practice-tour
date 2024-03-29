const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required:[true,'reviews cannot be empty']
    },
    rating: {
        type: Number,
        min:1,
        max:5
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    tour: {
        type: mongoose.Types.ObjectId,
        ref: 'Tour-practice',
        required: [true, 'review must belong to tour']
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: [true, 'review must belong to user']
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});


reviewSchema.pre(/^find/, function(next){
    // this.populate({path:'user',select:'name'}).populate({path:'tour',  select: 'name' })
    this.populate({path:'tour',  select: 'name' })

    next()
})


const Review = mongoose.model('review', reviewSchema)

module.exports = Review