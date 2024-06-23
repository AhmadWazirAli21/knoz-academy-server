const mongoose = require('mongoose');
require('dotenv').config();
const bcryptjs = require('bcryptjs')
const jwt  = require('jsonwebtoken')
const UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min : 8
  },
  about : String,
  avatar : String,
  skills : Array,
  courses : Array
});
UserSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
UserSchema.set("toJSON", { virtuals: true });

UserSchema.pre('save', async function () {
    return this.password = await bcryptjs.hash(this.password , await bcryptjs.genSalt(10))
})

UserSchema.methods.createToken = function () {
    let data = {
      id: this._id,
      name : this.name,
      email : this.email,
      courses : this.courses,
      about : this.about,
      skills : this.skills,
      avatar : this.avatar
    }
    const token = jwt.sign(data, process.env.JWT_SECRET);
    return token
}

UserSchema.methods.checkPassword = async function (password) {
  let isMatch = await bcryptjs.compare(password , this.password);
  return isMatch
}


module.exports = mongoose.model('User' , UserSchema);