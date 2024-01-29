import mongoose from "mongoose";

const userCollection = "users";

const UserSchema = new mongoose.Schema({
  email: { type: String, require: true, max: 100 },
  password: { type: String, require: true, max: 100 },
  role: { type: String, require: true, max: 100, default : "user"},
});

const User = mongoose.model(userCollection, UserSchema);

export default User;