const express = require("express");
const router = express.Router();
const subscriptionController = require("../controllers/subscriptionController");

// Endpoint para crear una nueva subscripción
router.post("/", subscriptionController.createSubscription);

// Endpoint para obtener todas las subscripciones
router.get("/", subscriptionController.getAllSubscriptions);

// Endpoint para obtener una subscripción por su ID
router.get("/:id", subscriptionController.getSubscriptionById);

// Endpoint para actualizar una subscripción
router.put("/:id", subscriptionController.updateSubscription);

// Endpoint para eliminar una subscripción
router.delete("/:id", subscriptionController.deleteSubscription);

module.exports = router;
