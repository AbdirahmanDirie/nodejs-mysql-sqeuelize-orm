const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('../models/Users');


const signUp=  async (req, res) => {
  try {
    const { name, email } = req.body;

     //all fields are required
     if (!name || !email || !req.body.password) {
      return res.status(404).json({ msg: "All fields required" });
    }

    const lowercaseEmail = email ? email.toLowerCase() : undefined;

    if (lowercaseEmail !== undefined) {
      const emailExist = await User.findOne({where: { email: lowercaseEmail }});
      if (emailExist) {
        return res.status(400).json({ msg: "Email already exists" });
      }
    }
    //password hashing algorithm
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = await User.create({ name, email, password: hashedPassword });
    res.status(201).json({msg: 'User Regisred Successfully'});
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
};

const signIn=  async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !req.body.password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const lowercaseEmail = email ? email.toLowerCase() : undefined;

    // Check for user email
    const user = await User.findOne({where:{ email:lowercaseEmail }});
    if (!user) {
      return res.status(404).json({ msg: "Email not found" });
    }

        //checking the password
        const validPass = await bcrypt.compare(req.body.password, user.password);

        //validate the password
        if (!validPass) {
          res.status(404);
          return res.status(404).json({ msg: "Incorect Password" });
        }

        const token = generateToken(user.id);
        res.status(200).json({
          token: token,
          id: user.id,
        });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
};


const getAllUser= async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
};


const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ msg: 'Note not found' });
    }
    user.email = email;
    user.name = name;
    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
};


// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};


module.exports = {
    signUp,
    signIn,
    getAllUser,
    updateUser,
};
