const express = require("express");
const router = express.Router();
const path = require("path");

// Ruta principal
router.get("/", (req, res) => {
  res.render("index");
});

module.exports = router;