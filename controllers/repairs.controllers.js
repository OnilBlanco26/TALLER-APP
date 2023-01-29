const Repairs = require('../models/repairs.model');

const findRepair = async (req, res) => {
  try {
    const id = req.params.id;
    const email = req.params.email ? req.params.email.toLowerCase() : null;
    const where = { status: 'pending' };
    if (id) where.id = id;
    if (email) where.email = email;

    const repair = await Repairs.findOne({ where });

    if (!repair) {
      return res.status(404).json({
        ok: false,
        msg: 'No repairs pending',
      });
    }

    res.json({
      ok: true,
      repair,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Server error',
      error,
    });
  }
};

const findRepairs = async (req, res) => {
  try {
    const repairs = await Repairs.findAll({
      where: {
        status: 'pending',
      },
    });

    if (!repairs) {
      return res.status(404).json({
        ok: false,
        msg: 'No repairs pending',
      });
    }

    res.json({
      ok: true,
      repairs,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Server error',
      error,
    });
  }
};

const findRepairEmail = async (req, res) => {
  try {
    const repair = await Repairs.findOne({
      where: {
        email: req.params.email.toLowerCase(),
        status: 'pending',
      },
    });

    if (!repair) {
      return res.status(404).json({
        ok: false,
        msg: 'No repairs pending',
      });
    }

    res.json({
      ok: true,
      repair,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Server error',
      error,
    });
  }
};
const createRepair = async (req, res) => {
  const { date, userId } = req.body;

  try {
    const repair = await Repairs.create({
      date,
      userId,
    });

    res.json({
      ok: true,
      repair,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'repair could not be created',
    });
  }
};

const updateRepair = async (req, res) => {
  const { id } = req.params;

  try {
    const repair = await Repairs.findByPk(id);

    if (!repair) {
      return res.status(404).json({
        ok: false,
        msg: 'Repair not found',
      });
    }

    await repair.update({ status: 'completed' });

    res.json({
      ok: true,
      repair,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Unable to update the repair',
    });
  }
};

const deleteRepair = async (req, res) => {
  const { id } = req.params;

  try {
    const repair = await Repairs.findByPk(id);

    if (!repair) {
      return res.status(404).json({
        ok: false,
        msg: 'Repair not found',
      });
    } else if (repair.status === 'completed') {
      return res.status(400).json({
        ok: false,
        msg: 'Repair already completed',
      });
    }

    await repair.update({ status: 'deleted' });

    res.json({
      ok: true,
      msg: 'Repair deleted',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Unable to delete the repair',
    });
  }
};

module.exports = {
  findRepairs,
  findRepair,
  createRepair,
  updateRepair,
  deleteRepair,
  findRepairEmail,
};
