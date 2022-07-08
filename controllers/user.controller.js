const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User.model');

module.exports = userController = {
  registerUser: async (req, res) => {
    try {
      // Get user input
      const { firstname, lastname, email, password } = req.body;

      console.log('firstname', 'lastname');

      // Validate user input
      if (!(email && password && firstname && lastname)) {
        return res.status(400).send('All input is required');
      }

      // check if user already exist
      // Validate if user exist in our database
      const oldUser = await User.findOne({ email });

      if (oldUser) {
        return res.status(409).send('User Already Exist. Please Login');
      }

      //Encrypt user password
      const encryptedPassword = await bcrypt.hash(password, 10);
      // Create user in our database
      const user = await User.create({
        first_name: firstname,
        last_name: lastname,
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        password: encryptedPassword,
      });

      // Create token
      const token = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY, {
        expiresIn: '24h',
      });
      // save user token
      user.token = token;

      // return new user
      return res.status(201).json(user);
    } catch (err) {
      return res.json({ error: err.message });
    }
  },
  doLogin: async (req, res) => {
    try {
      // Get user input
      const { email, password } = req.body;

      // Validate user input
      if (!(email && password)) {
        res.status(400).send('All input is required');
      }
      // Validate if user exist in our database
      const user = await User.findOne({ email });

      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY, {
          expiresIn: '24h',
        });

        // save user token
        user.token = token;

        // user
        res.status(200).json(user);
      }
      res.status(400).send('Invalid Credentials');
    } catch (err) {
      console.log(err);
    }
  },
};
