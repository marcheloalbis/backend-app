const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const plan = prisma.plan

const createPlan = async (req, res) => {
  try {
    const newPlan = await plan.create({
      data: req.body,
    });
    res.status(201).json(newPlan);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to create new plan" });
  }
};

const getAllPlans = async (req, res) => {
  try {
    const plans = await plan.findMany();
    res.status(200).json(plans);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to retrieve plans" });
  }
};

const getPlanById = async (req, res) => {
  try {
    const { id } = req.params;
    const selectedPlan = await plan.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json(selectedPlan);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to retrieve selected plan" });
  }
};

const updatePlan = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPlan = await plan.update({
      where: {
        id: parseInt(id),
      },
      data: req.body,
    });
    res.status(200).json(updatedPlan);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to update selected plan" });
  }
};

module.exports = {
  createPlan,
  getAllPlans,
  getPlanById,
  updatePlan,
};
