import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, required: false, default: "" },
  admin: { type: Boolean, required: false, default: false },
});

const User = mongoose.model("User", userSchema);

export default User;
