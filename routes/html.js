// route handling set up

// imports essential modules: 'express' and 'path' and express router is initialized
const express = require("express");
const path = require("path");
const router = express.Router();

// GET /notes should return the notes.html file.
router.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});

// GET * should return the index.html file.
router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// the router object is exported for use in other areas of application
module.exports = router;
