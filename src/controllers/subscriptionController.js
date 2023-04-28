const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createSubscription = async (req, res) => {
  try {
    const { planId, userId } = req.body;

    const newSubscription = await prisma.subscription.create({
      data: {
        plan: { connect: { id: planId } },
        user: { connect: { id: userId } },
      },
      include: {
        user: true,
        plan: true,
      },
    });

    res.status(201).json({ success: true, data: newSubscription });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

const getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await prisma.subscription.findMany({
      include: {
        user: true,
        plan: true,
      },
    });

    res.status(200).json({ success: true, data: subscriptions });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

const getSubscriptionById = async (req, res) => {
  try {
    const { id } = req.params;

    const subscription = await prisma.subscription.findUnique({
      where: { id: Number(id) },
      include: {
        user: true,
        plan: true,
      },
    });

    if (!subscription) {
      return res
        .status(404)
        .json({ success: false, error: 'Subscription not found' });
    }

    res.status(200).json({ success: true, data: subscription });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

const updateSubscription = async (req, res) => {
  try {
    const { id } = req.params;
    const { planId, userId } = req.body;

    const updatedSubscription = await prisma.subscription.update({
      where: { id: Number(id) },
      data: {
        plan: { connect: { id: planId } },
        user: { connect: { id: userId } },
      },
      include: {
        user: true,
        plan: true,
      },
    });

    res.status(200).json({ success: true, data: updatedSubscription });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

const deleteSubscription = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.subscription.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

module.exports = {
  createSubscription,
  getAllSubscriptions,
  getSubscriptionById,
  updateSubscription,
  deleteSubscription,
};
