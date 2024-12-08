import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  roll_number: {
    type: Number,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  codeforces: {
    type: String,
  },
  leetcode: {
    type: String,
  },
  codechef: {
    type: String,
  },
  geeksforgeeks: {
    type: String,
  },
  cf_rating: {
    type: Number,
  },
  lc_rating: {
    type: Number,
  },
  total_questions: {
    type: Number,
  },
});

const User = mongoose.model("User", UserSchema);
export default User;
