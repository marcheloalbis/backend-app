const { PrismaClient } = require('@prisma/client');
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
			return res.status(400).json({
				error: 'User already exists',
			});
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		console.log(hashedPassword);

		await prisma.$transaction(async (prisma) => {
			const user = await prisma.user.create({
				data: {
					name,
					email,
					password: hashedPassword,
					active: false,
				},
			});

			const token = jwt.sign(
				{ userId: user.id },
				process.env.JWT_SECRET,
				{
					expiresIn: '1d',
				}
			);

			const variables = {
				name: user.name,
				activationLink: `http://localhost:3000/auth/activate-account/${token}`,
			};

			await sendEmail(
				user.email,
				'Activate your account',
				'activate-account',
				variables
			);
		});

		res.json({
			message: 'User registered successfully, check your email to activate your account.',
		});
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const activateAccount = async (req, res) => {
	try {
		const { token } = req.params;
		const decoded = jwt.verify(
			token,
			process.env.JWT_SECRET
		);

		await prisma.$transaction(async (prisma) => {
			const user = await prisma.user.findUnique({
				where: { id: decoded.userId },
			});

			if (!user) {
				throw new Error(
					'User not found'
				);
			}

			if (user.active) {
				res.json({
					message: 'Account already activated',
				});
				return;
			}

			const updatedUser =
				await prisma.user.update({
					where: {
						id: decoded.userId,
					},
					data: {
						active: true,
					},
				});

			const variables = {
				name: updatedUser.name,
			};

			await sendEmail(
				updatedUser.email,
				'Account Activated',
				'account-activated',
				variables
			);
		});

		res.json({ message: 'Account activated successfully' });
	} catch (err) {
		console.error(err);
		res.status(500).json({
			message: 'Error activating account',
		});
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
			return res.status(400).json({
				error: 'Invalid email or password',
			});
		}

		const passwordMatch = await bcrypt.compare(
			password,
			user.password
		);

		if (!passwordMatch) {
			return res.status(400).json({
				error: 'Invalid email or password',
			});
		}

		const token = jwt.sign(
			{ userId: user.id },
			process.env.JWT_SECRET,
			{
				expiresIn: '1d',
			}
		);

		res.json({ token });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Vista para el formulario de restablecimiento de contraseña
const resetPasswordView = async (req, res) => {
    const { token } = req.params;

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await prisma.user.findUnique({
            where: {
                id: decodedToken.userId,
            },
        });

        if (!user) {
            return res.status(400).json({
                error: 'Invalid token',
            });
        }

        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Endpoint para restablecer la contraseña
const resetPassword = async (req, res) => {
    const { token, oldPassword, newPassword } = req.body;

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        await prisma.$transaction(async (prisma) => {
            const user = await prisma.user.findUnique({
                where: {
                    id: decodedToken.userId,
                },
            });

            if (!user) {
                return res.status(400).json({
                    error: 'Invalid token',
                });
            }

            const isMatch = await bcrypt.compare(oldPassword, user.password);

            if (!isMatch) {
                return res.status(400).json({
                    error: 'Invalid password',
                });
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);

            await prisma.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    password: hashedPassword,
                },
            });

            const newToken = jwt.sign(
                { userId: user.id },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1d',
                }
            );

            res.json({ token: newToken });
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const resetPasswordWithoutCurrent = async (req, res) => {
	const { token, password } = req.body;
  
	try {
	  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  
	  const user = await prisma.user.findUnique({
		where: {
		  id: decodedToken.userId,
		},
	  });
  
	  if (!user) {
		return res.status(400).json({
		  error: 'Invalid token',
		});
	  }
  
	  const hashedPassword = await bcrypt.hash(password, 10);
  
	  await prisma.user.update({
		where: {
		  id: user.id,
		},
		data: {
		  password: hashedPassword,
		},
	  });
  
	  const newToken = jwt.sign(
		{ userId: user.id },
		process.env.JWT_SECRET,
		{
		  expiresIn: '1d',
		}
	  );
  
	  res.json({ token: newToken, message:'password updated' });
	} catch (err) {
	  res.status(500).json({ error: err.message });
	}
  };
  
// Endpoint para enviar el correo electrónico de restablecimiento de contraseña
const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) {
            return res.status(400).json({
                error: 'User not found',
            });
        }

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET,
            {
                expiresIn: '30m',
            }
        );

        const resetUrl = `http://localhost:3000/auth/reset-password-current/${token}`;

        const variables = {
            name: user.name,
            resetUrl,
        };

        await sendEmail(
            user.email,
            'Reset your password',
            'reset-password',
            variables
        );

        res.json({ message: 'Email sent' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
	registerUser,
	loginUser,
	forgotPassword,
	resetPassword,
	activateAccount,
	resetPasswordView,
	resetPasswordWithoutCurrent
};
