import mongoose from "mongoose";

const contactSChema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowerCase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
    },
    message: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Contact = mongoose.model("contact", contactSChema);
