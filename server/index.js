const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");

// -------------------------MiddleWare-----------------------------
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// -------------------------DB-----------------------------
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "cruddb",
});

// -------------------------Routes-----------------------------
app.get("/", async (req, res) => {
  const insertQuery = "SELECT * from movie_review;";
  db.query(insertQuery, (err, result) => {
    if (err) {
      console.log(err.sqlMessage);
      res.status(400).json(err.sqlMessage);
    } else {
      res.status(200).json(result);
    }
  });
});

app.post("/", (req, res) => {
  const insertQuery =
    "INSERT INTO movie_review (movieName,movieDescription) VALUES (?,?);";
  const movieName = req.body.name;
  const movieDesc = req.body.desc;
  db.query(insertQuery, [movieName, movieDesc], (err, result) => {
    if (err) {
      res.status(400).json(err.sqlMessage);
    } else {
      res.status(200).json(result);
    }
  });
});

app.put("/", (req, res) => {
  const insertQuery =
    "UPDATE movie_review SET movieName=? , movieDescription=? WHERE id=?";
  const movieName = req.body.name;
  const movieDesc = req.body.desc;
  const id = req.body.id;
  console.log(id);
  db.query(insertQuery, [movieName, movieDesc, id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).json(err.sqlMessage);
    } else {
      console.log(result);
      res.status(200).json(result);
    }
  });
});
app.delete("/delete/:id", (req, res) => {
  const insertQuery = "DELETE FROM movie_review WHERE id=? ";
  db.query(insertQuery, [req.params.id], (err, result) => {
    if (err) {
      res.status(400).json(err.sqlMessage);
    } else {
      res.status(200).json(result);
    }
  });
});

app.listen("3001", (req, res) => {
  console.log("listening");
});
