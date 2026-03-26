const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      match: [/^\+?[\d\s\-]{7,15}$/, "Please enter a valid phone number"],
    },
    address: {
      type: String,
      trim: true,
      default: "",
    },
    category: {
      type: String,
      enum: ["friend", "family", "work", "other"],
      default: "other",
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);