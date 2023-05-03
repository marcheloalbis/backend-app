const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authenticateToken = require('../middlewares/authenticateToken');

// Endpoint para crear un nuevo usuario
router.post("/", userController.createUser);

// Endpoint para obtener todos los usuarios
router.get("/", authenticateToken, userController.getAllUsers);

// Endpoint para obtener un usuario por su ID
router.get("/:id", authenticateToken, userController.getUserById);

// Endpoint para actualizar un usuario
router.put("/:id", authenticateToken, userController.updateUser);

// Endpoint para eliminar un usuario
router.delete("/:id", authenticateToken, userController.deleteUser);

module.exports = router;
