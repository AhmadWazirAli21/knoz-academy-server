
const mongoose = require('mongoose');
const ReviewSchema = new mongoose.Schema({
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    review_content : String
})

module.exports = mongoose.model('Review' , ReviewSchema)