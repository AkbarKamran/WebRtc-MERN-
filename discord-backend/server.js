const express = require("express");
const cors = require("cors");
const http = require("http");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");

const PORT = process.env.PORT || process.env.API_PORT;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
const server = http.createServer(app);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(PORT, (err) => {
      if (err) {
        console.log(err);
      }
      console.log(`Server is listening on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("database Connection Failed");
    console.log(err);
  });
