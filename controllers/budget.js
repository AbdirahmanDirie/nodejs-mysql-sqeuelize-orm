const User = require('../models/Users');
const Budget = require('../models/budget');


const createBudget =  async (req, res) => {
  try {
    const { amount, type, name } = req.body;

     //all fields are required
     if (!type || !amount) {
      return res.status(404).json({ msg: "All fields required" });
    }

    const budget = await Budget.create({ name, amount, type, user: req.user.id});
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

  const delteBudget = async (req, res) => {
    try {
      const { amount } = req.params;
      const note = await Budget.findOne({where:{ amount:amount }});
      if (!note) {
        return res.status(404).json({ message: 'Note not found' });
      }
      await note.destroy();
      res.json({ msg: 'Budget deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Server Error' });
    }
  };

module.exports = {
    createBudget,
    getAllBudgets,
    delteBudget
}