const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "Username is required."],
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    match: [/^\S+@\S+\.\S+$/, "Plase use a valid email address."],
    unique: true,
    lowercase: true,
    trim: true,
  },
  passwordHash: String
});

const User = model("User", userSchema);

module.exports = User;
