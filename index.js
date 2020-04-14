const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const confg = require("config");
const mongoos = require("mongoose");

const app = express();

if (!confg.get("jwtPrivateKey")) {
  console.log("FATAL ERROR: jwtPrivateKey key is not define");
  process.exit(1);
}

//Connect to database
mongoos
  .connect(confg.get("db"), { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.log("Could not connect to MongoDB..."));

//Middleware
app.use(bodyParser.json());
app.use(cors());

const posts = require("./routes/posts");
const tweets = require("./routes/tweets");
const itunes = require("./routes/itunes");
const users = require("./routes/users");
const auth = require("./routes/auth");

app.use("/api/posts", posts);
app.use("/api/tweets", tweets);
app.use("/api/itunes", itunes);
app.use("/api/users", users);
app.use("/api/auth", auth);
const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server started on port ${port}`));
