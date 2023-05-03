const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendEmail } = require('../utils/nodemailer');

// Endpoint para registrar un nuevo usuario
const registerUser = async (req, res) => {

    const { name, email, password } = req.body;

try {
    const existingUser = await prisma.user.findUnique({
    where: {
        email,
    },
    });

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
        active: false, // Seteamos el usuario como inactivo
    },
    });


    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
    });

    // Envío de correo electrónico utilizando nodemailer
    const variables = {
    name: user.name,
    activationLink: `http://localhost:3000/auth/activate-account/${token}`, // URL de activación de cuenta
    };
    await sendEmail(user.email, 'Activate your account', 'activate-account', variables);

    res.json({ message: 'User registered successfully, check your email to activate your account.' });
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

    const resetUrl = `http://localhost:3000/auth/reset-password/${token}`;

    // Envío de correo electrónico para restablecer la contraseña utilizando nodemailer
    const variables = {
        name: user.name,
        resetUrl, // URL de reseteo de contraseña
    };
    await sendEmail(user.email, 'Reset your password', 'reset-password', variables);

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

module.exports = {
    registerUser,
    loginUser,
    forgotPassword,
    resetPassword,
  };