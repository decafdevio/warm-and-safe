const mongoose = require("mongoose")

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      lowercase: true,
      unique: true,
      immutable: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    brand: {
      type: String,
      default: "Verified by",
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("User", userSchema)
