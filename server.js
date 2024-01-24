const mongoose = require("mongoose");
const { app } = require("./app");

const PORT = 2000;
const MONGODB_URI = "mongodb://0.0.0.0:27017/populate-guideline";

//A mongoose option that allows you to use the mongoose query builder
// with mongodb queries.
mongoose.set("strictQuery", false);

app.get("/small", (req, res) => {
  return res.send("i am alive");
});

//connecting to the database
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.warn("connected successfully");
    //start the server
    app.listen(PORT, () => {
      console.log(`server ready on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("err.message :>> ", err.message);
    throw "error occured : " + err.message;
  });
