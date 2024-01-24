const { default: mongoose } = require("mongoose");
const { Jobs } = require("../model/jobs");
const { User } = require("../model/user");

exports.jobServices = {
  addJob: async (req, res) => {
    const { name, dor, userName } = req.body;
    const check4DuplicateName = await Jobs.findOne({ name });

    if (check4DuplicateName)
      return res.status(409).json({ message: "Name must be unique" });
    let createJob;
    try {
      createJob = await Jobs.create({
        name,
        DOR: dor,
      });

      await User.findOneAndUpdate(
        { name: userName },
        {
          $addToSet: { jobs: createJob._id },
        }
      );
      return res.status(200).json({ message: "created job successfully" });
    } catch (error) {
      await Jobs.deleteOne({ _id: createdJob._id });
      return res.status(400).json({ message: error.message });
    }
  },

  updateJob: async (req, res) => {
    const { id } = req.params;
    const { name, dor, staffName, ...sections } = req.body;
    const directProps = { name, DOR: dor };
    const updatedSection = {};
    const cloneObj = { ...sections };

    for (const key in cloneObj) {
      updatedSection[`sections.${key}`] = new mongoose.Types.ObjectId(
        cloneObj[key]
      );
    }

    const findJob = await Jobs.findOneAndUpdate(
      { _id: id },
      {
        $set: directProps,
        $addToSet: {
          ...updatedSection,
        },
      },
      {
        new: true,
        omitUndefined: true,
      }
    );

    if (!findJob) return res.status(404).json({ message: "No match found" });

    return res.status(200).json({ message: "Job updated successfully" });
  },

  getJobs: async (req, res) => {
    try {
      const getJobs = await Jobs.find({});
      res.status(200).json({ data: getJobs });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
