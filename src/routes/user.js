const { userServices } = require("../services/user");

const UserRouter = require("express").Router();

UserRouter.route("/users")
  .post(userServices.addUser)
  .get(userServices.getUsers);
UserRouter.route("/user").get(userServices.getUser);

module.exports = { UserRouter };
