const User = require("../Models/user");
const Course = require("../Models/course");
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
  const data = ({ name, email, password } = req.body);
  try {
    if (await User.findOne({ email })) {
      return res.status(422).json({ msg: "user already exist" });
    }
    const user = await User.create(data);
    return res.status(200).json({token: user.createToken(),user});
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // await User.findOne({ email }).then(async (user) => {
    //   if (!user) {
    //     return res
    //       .status(401)
    //       .json({ msg: "Please check username or password" });
    //   }
    //   const isMatch = await user.checkPassword(password);
    //   if (!isMatch) {
    //     return res
    //       .status(401)
    //       .json({ msg: "Please check username or password" });
    //   }
    const user = await User.findOne({email})
    console.log(user);
    if(!user) {
      return res.status(401).json({ msg: "Please check username or password" });
    }
    const isMatch = await user.checkPassword(password);
    if(!isMatch) {
      return res .status(401).json({ msg: "Please check username or password" });
    }

      console.log(user);
      return res.status(200).json({ token: user.createToken(), user });
    // }); // user.token = user.createToken ()
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getCurrentUser = async (req, res) => {
  const {user_id} = req.params
  try {
    currentUser = await User.findById(user_id)
    return res.status(200).json(currentUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updateUserInfos = async (req, res) => {
  const url = req.protocol + "://" + req.get("host");
  const { name, about } = req.body;
  if (req.file && name && about) {
    try {
      const user = await User.findByIdAndUpdate(req.currentUser.id, {
        avatar: url + "/images/" + req.file.filename,
        name: name,
        about: about,
      });
      return res.status(200).json({ token: user.createToken(), user });
    } catch (error) {
      res.status(500).json(error);
    }
  } else if(!req.file && name && about) {
    try {
      const user = await User.findByIdAndUpdate(req.currentUser.id, {
        name: name,
        about: about,
      });
      return res.status(200).json({ token: user.createToken(), user });
    } catch (error) {
      res.status(500).json(error);
    }
  }else if(!name && about && req.file) {
    try {
      const user = await User.findByIdAndUpdate(req.currentUser.id, {
        avatar: url + "/images/" + req.file.filename,
        about: about,
      });
      return res.status(200).json({ token: user.createToken(), user });
    } catch (error) {
      res.status(500).json(error);
    }
  }else if (!about && name && req.file) {
    try {
      const user = await User.findByIdAndUpdate(req.currentUser.id, {
        avatar: url + "/images/" + req.file.filename,
        name: name,
      });
      return res.status(200).json({ token: user.createToken(), user });
    } catch (error) {
      res.status(500).json(error);
    }
  }else if(!req.file && !name) {
    try {
      const user = await User.findByIdAndUpdate(req.currentUser.id, {
        about : about
      });
      return res.status(200).json({ token: user.createToken(), user });
    } catch (error) {
      res.status(500).json(error);
    }
  }else if(!req.file && !about) {
     try {
       const user = await User.findByIdAndUpdate(req.currentUser.id, {
         name: name,
       });
       return res.status(200).json({ token: user.createToken(), user });
     } catch (error) {
       res.status(500).json(error);
     }
  }else if(!name && !about && req.file) {
     try {
       const user = await User.findByIdAndUpdate(req.currentUser.id, {
         avatar :  url + "/images/" + req.file.filename,
       });
       return res.status(200).json({ token: user.createToken(), user });
     } catch (error) {
       res.status(500).json(error);
     }
  }
};

exports.addSkills = async (req, res) => {
  const {skills} = req.body
  const userSkills = skills.split(' ');
  const oldSkills = await User.findById(req.currentUser.id)
  const newSkills = oldSkills.skills.concat(userSkills)
  
  try {
    await User.findByIdAndUpdate(req.currentUser.id, {
      skills : newSkills
    });
    res.status(200).json(userSkills)
  } catch (error) {
    return res.status(500).json(error)
  }
}

exports.getUserCourses = async (req, res) => {
  try {
    const courses = await Course.find({ user_id: req.currentUser.id });
    return res.status(200).json(courses);
  } catch (error) {
    res.status(500).json(error);
  }
};


// exports.isAdmin = async (req,res) => {
//   try {
//     const token = req.body;
//     const user = jwt.verify(token,process.env.JWT_SECRET);
//     if(user.email == 'kb@bigBoss.com') return res.status(200).send(true);
//     return res.status(401).send(false);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// }


exports.courseEnrollment = async (req,res) => {
  const {course_id} = req.body;
  try {
    const user = await User.findById(req.currentUser.id);
    // const course = await Course.findById(course_id);
    const newCourses = user.courses.concat(course_id)

    console.log(newCourses);
    await User.findByIdAndUpdate(req.currentUser.id,{
      courses : newCourses
    })
    return res.status(200).send('Enrolled successfully')
  } catch (error) {
    res.status(500).send('server error')
  }
}