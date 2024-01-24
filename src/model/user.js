const { Schema, default: mongoose } = require("mongoose");
const User = new Schema(
  {
    name: { type: String, required: [true, "Name is required"], trim: true },
    email: { type: String, required: [true, "Email is required"], trim: true },
    gender: {
      type: String,
      required: [true, "Gender is required"],
      trim: true,
    },
    jobs: [
      {
        type: Schema.Types.ObjectId,
        required: [true, "Job is required, and must be a valid objectid"],
        ref: "jobs",
        trim: true,
      },
    ],
  },
  { timestamps: true }
);
module.exports.User = mongoose.model("User", User);
