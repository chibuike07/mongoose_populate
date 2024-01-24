const express = require("express");
const cors = require("cors");
const { UserRouter } = require("./src/routes/user");
const { JobRouter } = require("./src/routes/jobs");
const app = express();

app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/v1", UserRouter);
app.use("/v1", JobRouter);

module.exports = { app };
