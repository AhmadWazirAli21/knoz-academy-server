
const Video = require('../Models/video.js');

exports.addVideos = async (req, res) => {
    const { video_title, description, course_id } = req.body;
    const url = req.protocol + '://' + req.get('host');
    if(!req.files) {
        return res.status(400).json({msg : 'no videos selected'})
    }
    console.log(video_title, description, course_id);
    req.files.map(async function (file) {
            await Video.create({
                video_title,
                video_uri : url + '/videos/' + file.filename,
                course_id ,
                description 
            })
        })
        return res.status(200).json({msg : 'videos added'})
}