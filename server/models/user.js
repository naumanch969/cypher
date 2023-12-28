import mongoose, { Schema } from "mongoose";

const userSchema = Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  gender: String,
  image: String,
});

const User = mongoose.model("User", userSchema);

export default User;
