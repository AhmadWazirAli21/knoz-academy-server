const mongoose = require('mongoose');
const VideoSchema = new mongoose.Schema({
    video_title : String,
    video_uri : String,
    course_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Course'
    },
    description : String
})

module.exports = mongoose.model('Video', VideoSchema )