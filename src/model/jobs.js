const { Schema, default: mongoose } = require("mongoose");
const staffToWorkWith = {
  type: Schema.Types.ObjectId,
  ref: "User",
  required: [
    true,
    "staff to work with is required and must be a valid object id type",
  ],
};

const sections = {
  HR: [staffToWorkWith],
  IT: [staffToWorkWith],
  MT: [staffToWorkWith],
};

const Jobs = new Schema(
  {
    name: {
      type: String,
      required: [true, "Job name is required"],
      trim: true,
    },
    DOR: { type: String, required: [true, "DOR is required"], trim: true },
    sections: sections,
  },
  { timestamps: true }
);

module.exports.Jobs = mongoose.model("jobs", Jobs);
