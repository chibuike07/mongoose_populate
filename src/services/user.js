const { default: mongoose } = require("mongoose");
const { Jobs } = require("../model/jobs");
const { User } = require("../model/user");

module.exports.userServices = {
  addUser: async (req, res) => {
    const { email, jobName, dor, gender, name } = req.body;

    const checkIfUserAlreadyExists = await User.findOne({ email });

    if (checkIfUserAlreadyExists)
      return res.status(409).json({ message: "User already exists" });

    let createJob;
    try {
      createJob = await Jobs.create({
        name: jobName,
        DOR: dor,
      });
      await User.create({
        name,
        email,
        gender,
        jobs: [new mongoose.Types.ObjectId(createJob._id)],
      });
      return res.status(200).json({ message: "user created successfully" });
    } catch (err) {
      await Jobs.deleteOne({ _id: createJob?._id });
      return res.status(400).json({ message: err.message });
    }
  },

  getUsers: async (req, res) => {
    const getAllUsers = await User.find({}).populate("jobs", "name DOR");

    if (getAllUsers.length < 1)
      return res.status(404).json({ message: "No users found" });
    return res.status(200).json({ data: getAllUsers });
  },

  getUser: async (req, res) => {
    const query = { ...req.body };

    const getAllUsers = await User.findOne(query).populate({
      path: "jobs",
      match: { name: { $eq: "web developer" } },
      populate: {
        path: "sections",
        populate: [
          {
            path: "HR",
            select: "-_id name email gender",
          },
          {
            path: "IT",
            select: "-_id name email gender",
          },
          {
            path: "MT",
            select: "-_id name email gender",
          },
        ],
      },
    });

    if (!getAllUsers)
      return res.status(404).json({ message: "Match not found" });

    return res.status(200).json({ data: getAllUsers });
  },
};
