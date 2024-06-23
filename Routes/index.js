const express = require('express');
const router = express.Router();
const user_controller = require("../Controllers/user_controller");
const course_controller = require('../Controllers/course_controller')
const video_controller = require('../Controllers/video_controller')
const review_controller = require('../Controllers/review_controller')
const isLoggedIn = require('../Middlewares/authictecation')
const upload = require('../Middlewares/upload');
const upload_video = require('../Middlewares/upload_video')

//user routes

router.route('/account/register').post(user_controller.register);
router.route("/account/login").post(user_controller.login);
router.get('/account/get-current-user/:user_id' , isLoggedIn , user_controller.getCurrentUser);
router.post('/account/profile/update' , isLoggedIn , upload.single('avatar'),user_controller.updateUserInfos)
router.post('/account/profile/update-skills', isLoggedIn , user_controller.addSkills)
router.get('/account/profile/courses' , isLoggedIn , user_controller.getUserCourses);
router.patch('/account/course_enroll',isLoggedIn,user_controller.courseEnrollment)

// course routes

router.get('/courses' ,course_controller.getAllCourses)
router.post('/courses/create-course' , isLoggedIn , upload.single('course_img') , course_controller.addCourse );
router.get('/courses/get-course/:course_id' , /*isLoggedIn*/  course_controller.getCourseVideos)
//router.patch("/courses/enroll/:course_id" ,isLoggedIn , course_controller.enrollCourse);

// video routes 

router.post('/courses/create-course/add-videos' , isLoggedIn , upload_video.array('video_uri', 10000) , video_controller.addVideos)

//review routes

router.post('/add-review/:user_id' , isLoggedIn , review_controller.addReview)

module.exports = router

