const mongoose = require("mongoose");
const CourseSchema = new mongoose.Schema({
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    course_name : String,
    course_duration : String,
    course_price : String,
    course_img : String,
    category : String,
    course_description : String,
    isEnrolled : {
        type : Boolean,
        default : false
    },
})
module.exports = mongoose.model('Course' , CourseSchema)