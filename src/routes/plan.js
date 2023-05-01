const express = require("express");
const router = express.Router();
const planController = require("../controllers/planController");
const authenticateToken = require('../middlewares/authenticateToken');

// Endpoint para crear un nuevo plan
router.post("/", planController.createPlan);

// Endpoint para obtener todos los planes
router.get("/", authenticateToken,planController.getAllPlans);

// Endpoint para obtener un plan por su ID
router.get("/:id", planController.getPlanById);

// Endpoint para actualizar un plan
router.put("/:id", planController.updatePlan);

module.exports = router;
