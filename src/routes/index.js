const { Router } = require("express");
const router = Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const json_books = fs.readFileSync("src/books.json", "utf-8");
let books = JSON.parse(json_books);

router.get("/", (req, res) => {
  res.render("index", { books });
});

router.get("/new-entry", (req, res) => {
  res.render("new-entry");
});

router.post("/new-entry", (req, res) => {
  const { title, autor, image, description } = req.body;
  if (!title || !autor || !image || !description) {
    res.status(400).send("Las entradas deberian tener campos completos");
    return;
  }

  let newBook = {
    id: uuidv4(),
    title,
    autor,
    image,
    description,
  };
  books.push(newBook);

  const json_books = JSON.stringify(books);
  fs.writeFileSync("src/books.json", json_books, "utf-8");
  res.redirect("/");
});

router.get("/delete/:id", (req, res) => {
  books = books.filter((book) => book.id != req.params.id);

  // saving data
  const json_books = JSON.stringify(books);
  fs.writeFileSync("src/books.json", json_books, "utf-8");

  res.redirect("/");
});

module.exports = router;
