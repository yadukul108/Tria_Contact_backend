const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
  },
  surname: {
    type: String,
    required: [true, "Surname is required"],
    trim: true,
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    unique: true,
    validate: {
      validator: (v) => /^\d{10}$/.test(v),
      message: "Phone number should be 10 digits",
    },
  },
  email: {
    type: String,
    unique: true,
    sparse: true, // allows multiple empty emails
    lowercase: true,
    trim: true,
    validate: {
      validator: (v) => !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
      message: "Invalid email format",
    },
  },
  isFavorite: { type: Boolean, default: false },
  profileImage: {
    type: String,
    default:
      "https://images.unsplash.com/photo-1457449940276-e8deed18bfff?auto=format&fit=crop&q=60&w=500",
  },
  note: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
