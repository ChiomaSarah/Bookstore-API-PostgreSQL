const pool = require("./db.js");

const express = require("express");

const apiRouter = require("./routes/api");

const app = express();

app.use("/books", apiRouter);

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.get("/", (req, res) => {
  res.json({
    message: "Hello there! Welcome to my bookstore api!",
  });
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error("Error acquiring client", err.stack);
  }
  client.query("SELECT NOW()", (err, result) => {
    release();
    if (err) {
      return console.error("Error executing query", err.stack);
    }
    console.log("Connected to the Database!");
  });
});

const PORT = process.env.PORT || 2021;
app.listen(PORT, () => {
  console.log(`app started on port ${PORT}`);
});