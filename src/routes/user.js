const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Endpoint para crear un nuevo usuario
router.post("/", userController.createUser);

// Endpoint para obtener todos los usuarios
router.get("/", userController.getAllUsers);

// Endpoint para obtener un usuario por su ID
router.get("/:id", userController.getUserById);

// Endpoint para actualizar un usuario
router.put("/:id", userController.updateUser);

// Endpoint para eliminar un usuario
router.delete("/:id", userController.deleteUser);

/* // Endpoint para Generar reporte de usuarios
router.get('/report', userController.generateUserReport); */

module.exports = router;
