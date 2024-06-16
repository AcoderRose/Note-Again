// Import necessary modules
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
  } catch (err) {
    res.status(500).json({ error: "Oops! Failed to read notes data." });
  }
});

module.exports = router;
