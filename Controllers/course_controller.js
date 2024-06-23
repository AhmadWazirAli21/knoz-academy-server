const Course = require('../Models/course');
const Video = require('../Models/video')

exports.addCourse = async (req ,res) => {
    const url =  req.protocol + "://" + req.get("host");
    const {
      course_name,
      course_duration,
      course_price,
      category,
      course_description,
      isEnrolled
    } = req.body;
    try {
        console.log(req.file);
        if(req.file){
            const course = await Course.create({
              user_id: req.currentUser.id,
              course_name,
              course_duration,
              course_price,
              course_img: url + "/images/" + req.file.filename,
              category,
              course_description,
              isEnrolled,
            });
            return res.status(200).json(course)
        }else{
             const course = await Course.create({

               user_id: req.currentUser.id,
               course_name,
               course_duration,
               course_price,
               category,
               course_description,
               isEnrolled,
             });
             return res.status(200).json(course);
        }
    } catch (error) {
        res.status(500).json(error)
    }
}
exports.getAllCourses = async (req ,res) => {
    try {
        const allcourses = await Course.find({})
        return res.status(200).json(allcourses)
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.getCourseVideos = async (req, res) =>{ 
    const {course_id} = req.params
    try {
        const course_videos = await Video.find({course_id : course_id})
        res.status(200).json(course_videos)
    } catch (error) {
        res.status(500).json(error)
    }
}



