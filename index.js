const express = require("express");
const { connection } = require("./Config/db");
const { UserRoute } = require("./Routes/User.routes");
const { PostRoute } = require("./Routes/Post.routes");

const app = express();

app.use(express.json());

//User Information
app.use("/", UserRoute);

//User Post
app.use("/", PostRoute);

//listing at Port
app.listen(8080, async () => {
  try {
    await connection;
    console.log("Connected to Database");
  } catch (err) {
    console.log("Error connecting to Database");
    console.log(err);
  }
  console.log("Listining to port 8080");
});
