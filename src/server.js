const express = require("express");
const app = express();
const cors = require("cors");
const consola = require("consola");
const chalk = require("chalk");
const key = require("./config/key");
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use(require("./routes/index"));

app.listen(key.port, () =>
  consola.success(
    `App is running on ${chalk.green.underline.bold(
      `http://localhost:${key.port}`
    )}`
  )
);
