const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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
/* const generateUserReport = async (type) => {
  try {
    const userTemplatePath = path.join(__dirname, '../utils/templates/user-template.html');
    const userTemplate = fs.readFileSync(userTemplatePath, 'utf8');
    
    const users = await prisma.user.findMany();

    const reportData = {
      users: users,
      date: new Date(),
    };

    const report = await jsreport({
      template: {
        content: userTemplate,
        engine: 'handlebars',
        recipe: `${type}-report`,
      },
      data: reportData,
    }).render();

    return report.content;
  } catch (err) {
    throw new Error(err.message);
  }
}; */


module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  //generateUserReport
};
