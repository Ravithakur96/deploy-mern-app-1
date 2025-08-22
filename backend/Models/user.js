const mongoose = require("mongoose");

// pehle schema banao
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true });  // timestamps: createdAt, updatedAt

// fir schema ko model me convert karo
const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
