const User = require('../models/Users');
const Budget = require('../models/budget');


const createBudget =  async (req, res) => {
  try {
    const { amount, type } = req.body;

     //all fields are required
     if (!type || !amount) {
      return res.status(404).json({ msg: "All fields required" });
    }

    const budget = await Budget.create({ amount, type, user: req.user.id});
    res.status(201).json({msg: 'Budget Created'});
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
};

const getAllBudgets= async (req, res) => {
    try {
      const budgets = await Budget.findAll({where: { user: req.user.id}});
      res.json(budgets);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Server Error' });
    }
  };

module.exports = {
    createBudget,
    getAllBudgets
}