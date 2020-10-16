const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const { readdirSync } = require("fs");
require("dotenv").config();

const app = express();

mongoose
  .connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => console.log("DB CONNECTED"))
  .catch((error) => console.log(`DB CONNECTION ERROR ${error}`));

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());

readdirSync("./routes").map((routes) =>
  app.use("/api", require("./routes/" + routes))
);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Listening on PORT ${port}`));
