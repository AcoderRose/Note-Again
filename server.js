// express server set up

// import essential modules: 'express' and route handlers for 'notes.js' and 'html.js'
const express = require("express");
const apiRoutes = require("./routes/notes");
const htmlRoutes = require("./routes/html");

const app = express(); // express application creation
const PORT = process.env.PORT || 3001; // port set to port 3001

// middleware section
app.use(express.json()); // JSON requests are parsed
app.use(express.urlencoded({ extended: true })); // URL-encoded requests are parsed
app.use(express.static("public")); // Static files from the 'public' directory are served

// routes section
app.use("/api/notes", apiRoutes); // '/api/notes' used for the API routes
app.use("/", htmlRoutes); // root path uses HTML routes

app.listen(PORT, () => {
  // Server started
  console.log(`App listening at http://localhost:${PORT}`); // server start message logged
});
