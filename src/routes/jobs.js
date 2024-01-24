const { jobServices } = require("../services/jobs");

const JobRouter = require("express").Router();

JobRouter.route("/jobs").post(jobServices.addJob).get(jobServices.getJobs);
JobRouter.route("/jobs/:id").put(jobServices.updateJob);

module.exports = { JobRouter };
