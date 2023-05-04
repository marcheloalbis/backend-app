const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController");

// Endpoint para generar un reporte
router.post("/usuarios/", reportController.getAllUsersReportPDF);

module.exports = router;
