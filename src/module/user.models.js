import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: true,
    required: true
  },
  createAt: {
    type: Date,
    default: Date.now
  }
})

const UserModel = mongoose.models.Users || mongoose.model('Users', UserSchema)
export default UserModel
