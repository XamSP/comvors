const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  role: {
    type: String,
    enum: ['User', 'Admin', 'Boss',],
    default : 'User'
  },
  specialty: {
    type: String,
    enum: ['Null', 'Programmer', 'Designer', 'Voice-Actor'],
    default : 'Null'
  },
  coins: {
    type: Number,
    default: 10,
  },
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const User = mongoose.model("User", userSchema);
module.exports = User;