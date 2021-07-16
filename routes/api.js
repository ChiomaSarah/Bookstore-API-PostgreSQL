const express = require("express");

const router = express.Router();

const pool = require("../db");

const jsonParser = express.json();

//get all books from the API
router.get("/", async(req, res) => {
    try{
  await pool.query("Select * from books", (err, result) => {
    if (!err) {
      res.json({
        status: 200,
        message: "Request successful... Books Retrieved!",
        data: result.rows,
      });
    }
  });
} catch (err) {
    res.status(400).json({ message: err.message });
  }
  pool.end;
});

//get a book by it's id
router.get("/:id", async (req, res) => {
    try{
  await pool.query(
    `select * from books where book_id=${req.params.id}`,
    (err, result) => {
      if (!err) {
        // res.send(result.rows);
        res.json({
          status: 200,
          message: "Request successful... Book Retrieved!",
          data: result.rows,
        });
      }
    }
  );
} catch (err) {
    res.status(400).json({ message: err.message });
  }
  pool.end;
});

//create a new book
router.post("/", jsonParser, async (req, res) => {
  try {
    const info = req.body;
    let insertQuery = `insert into books(book_title, book_author, book_rating, book_genre, book_publication_date) 
                       values('${info.book_title}', '${info.book_author}', '${info.book_rating}', '${info.book_genre}', '${info.book_publication_date}')`;

    await pool.query(insertQuery, (err, result) => {
      if (!err) {
        res.json({
          status: 201,
          message: "Request successful... Book Created!",
        });
      } else {
        console.log(err.message);
      }
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
  pool.end;
});

//update a book
router.patch("/:id", jsonParser, async(req, res) => {
  try{
  let updateQuery = `update books
                       set book_id = '${req.params.id}',
                       book_title = '${req.body.book_title}',
                       book_author = '${req.body.book_author}',
                       book_rating = '${req.body.book_rating}',
                       book_genre = '${req.body.book_genre}',
                       book_publication_date = '${req.body.book_publication_date}'
                       
                           
                       where book_id = ${req.params.id}`;

  await pool.query(updateQuery, (err, result) => {
    if (!err) {
      res.json({
        status: 200,
        message: "Request successful... Book Updated!'",
      });
    } else {
      console.log(err.message);
    }
  });
} catch {
  res.status(404).json({ error: "Request failed... Book does not exist!" });
}
  pool.end;
});

//delete a book
router.delete("/:id", async(req, res) => {
  try{
  let insertQuery = `delete from books where book_id=${req.params.id}`;

   await pool.query(insertQuery, (err, result) => {
    if (!err) {
      res.json({
        status: 200,
        message: "Request succesful... Book Deleted!'",
      });
    } else {
      res.status(404).json({ error: "Request failed... Book doesn't exist!" });
    }
  });
}
  catch {
    res.status(404).json({ error: "Request failed... Book doesn't exist!" });
  }
  pool.end;
});

module.exports = router;