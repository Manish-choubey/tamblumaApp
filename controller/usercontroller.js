

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/Usermodel');

const createUser =  async (req, res) => {
  const { name, email, password } = req.body;

  // hash the password using bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  // create a new user
  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  // save the user to the database
  try {
    await user.save();
    res.status(201).send('User created successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
};



const LoginUsr = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, 'manish', { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
};

module.exports.createUser = createUser
module.exports.LoginUsr = LoginUsr

