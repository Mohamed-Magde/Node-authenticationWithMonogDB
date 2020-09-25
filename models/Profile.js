const mongoose = require("mongoose");

const ProfileSchema = mongoose.Schema({
  user : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "user"
  },
  location : {
    type : String
  },
  company: {
    type: String
  }, 
  bio: {
    type: String
  },
})



module.exports = Profile = mongoose.model('profile', ProfileSchema);