const helmet = require("helmet");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const login = require("./routes/login");
const register = require("./routes/register");

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

app.use("/api/login", login);
app.use("/api/register", register);

const port = 8000;
const uri =
  "mongodb+srv://denniskiplagat009:kibz254@cluster0.p428gkq.mongodb.net/";

app.listen(port, console.log(`Server running on port ${port}`));

mongoose.set("strictQuery", false);

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mogodb conn successfull"));
