const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters long"],
    select: false,
  },
  resetpasswordtoken: String,
  resetpasswordexpires: Date,
});
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
});
const User = mongoose.model("User", UserSchema);
module.exports = User;
