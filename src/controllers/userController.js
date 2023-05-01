  const { PrismaClient } = require("@prisma/client");
  const prisma = new PrismaClient();
  const bcrypt = require('bcrypt');
  const jwt = require('jsonwebtoken');
  // Endpoint para registrar un nuevo usuario
  const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
      const existingUser = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      console.log(existingUser);
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      console.log(hashedPassword);
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });
      console.log(user);

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      console.log(token);
      res.json({ token });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  // Endpoint para iniciar sesión
  const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        return res.status(400).json({ error: "Invalid email or password" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(400).json({ error: "Invalid email or password" });
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      res.json({ token });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  // Endpoint para solicitar restablecimiento de contraseña
  const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "30m",
      });

      const resetUrl = `http://localhost:3000/reset-password/${token}`;

      // Envío de correo electrónico para restablecer la contraseña
      // utilizando nodemailer

      res.json({ message: "Email sent" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  // Endpoint para restablecer la contraseña
  const resetPassword = async (req, res) => {
    const { token, password } = req.body;

    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      const user = await prisma.user.findUnique({
        where: {
          id: decodedToken.userId,
        },
      });

      if (!user) {
        return res.status(400).json({ error: "Invalid token" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const updatedUser = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          password: hashedPassword,
        },
      });

      const newToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      res.json({ token: newToken });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password,
        },
      });
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  const getAllUsers = async (req, res) => {
    try {
      const users = await prisma.user.findMany();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  const getUserById = async (req, res, next) => {
    const { id } = req.params;

    try {
      const user = await prisma.user.findUnique({
        where: {
          id: parseInt(id)
        }
      });
      res.json(user);
    } catch (error) {
      next(error);
    }
  };


  const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;

    try {
      const updatedUser = await prisma.user.update({
        where: {
          id: parseInt(id),
        },
        data: {
          name,
          email,
          password,
        },
      });
      res.json(updatedUser);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
      const deletedUser = await prisma.user.delete({
        where: {
          id: parseInt(id),
        },
      });
      res.json(deletedUser);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };


  module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    registerUser,
    loginUser,
    forgotPassword,
    resetPassword,
  };
