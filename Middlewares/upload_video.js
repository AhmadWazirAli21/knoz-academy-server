const multer = require('multer');
require('dotenv').config() 

const storage = multer.diskStorage({
    destination : (req, res ,cb) => {
        cb(null, process.env.VId_DIR);
    },
    filename : (req, file ,cb) => {
        const extArray = file.mimetype.split("/");
        const extension = extArray[1];
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + "." + extension);
    } 
})

const upload_video = multer({
  storage: storage,
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype == "video/mp4"){
//       cb(null, true);
//     } else {
//       cb(new multer.MulterError("Not a picture"));
//     }
//   },
});

module.exports = upload_video