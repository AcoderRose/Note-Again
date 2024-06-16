// API route handling for notes set up

// Import essential modules: 'express', 'fs', 'path', and 'uuid'
const express = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();

// Helper function reads the data on the db.json file.
// Returns a promise that resolves with the file data or rejects with an error
const readFromFile = (filePath) =>
  new Promise((resolve, reject) =>
    fs.readFile(filePath, "utf8", (err, data) =>
      err ? reject(err) : resolve(data)
    )
  );

// Helper function writes the data on the db.json file.
// Returns a promise that resolves if the file is written successfully or rejects with an error
const writeToFile = (filePath, content) =>
  new Promise((resolve, reject) =>
    fs.writeFile(filePath, JSON.stringify(content, null, 4), (err) =>
      err ? reject(err) : resolve()
    )
  );

// GET /api/notes should read the db.json file and return all saved notes as JSON.
router.get("/", async (req, res) => {
  try {
    const data = await readFromFile(path.join(__dirname, "../db/db.json"));
    res.json(JSON.parse(data));
    // error handling
  } catch (err) {
    //data sent as JSON
    res.status(500).json({ error: "Oops! Failed to read notes data." });
  }
});

// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.
router.post("/", async (req, res) => {
  try {
    const { title, text } = req.body; // title and text gotten from request body
    const newNote = { id: uuidv4(), title, text }; // new note created with a unique ID
    const data = await readFromFile(path.join(__dirname, "../db/db.json"));
    const notes = JSON.parse(data); // existing notes parsed
    notes.push(newNote); //new note added to notes array
    await writeToFile(path.join(__dirname, "../db/db.json"), notes);
    res.json(newNote);
  } catch (err) {
    res.status(500).json({ error: "Oops! Failed to save note." }); //error handling
  }
});

module.exports = router;
