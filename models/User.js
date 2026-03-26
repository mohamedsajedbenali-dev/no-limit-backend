const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  // ⭐ saved exercises
  favorites: [
    {
      id: Number,
      name: String,
      image: String,
      stepImage: String,
      description: String,
    }
  ],

  // 📅 workout split
  plan: {
  Mon: { type: Array, default: [] },
  Tue: { type: Array, default: [] },
  Wed: { type: Array, default: [] },
  Thu: { type: Array, default: [] },
  Fri: { type: Array, default: [] },
  Sat: { type: Array, default: [] },
  Sun: { type: Array, default: [] }
}

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);