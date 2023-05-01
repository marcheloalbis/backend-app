const { prisma } = require('./index');

async function createUser(data) {
  const user = await prisma.user.create({ data });
  return user;
}

async function getUserByEmail(email) {
  const user = await prisma.user.findUnique({ where: { email } });
  return user;
}

module.exports = {
  createUser,
  getUserByEmail,
};
