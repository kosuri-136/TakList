// var User = require("../models/user.js");

// exports.registerUser = async (req, res) => {
//   try {
//     const user = req.body; // destructing only the user data from the request body

//     const findUser = await User.findOne({ email: user.email }); // finding if user is already present in the database based on emailId
//     console.log(findUser);

//     // if user is not present we create the user  or else we return a message saying User is already present
//     if (!findUser) {
//       const newUser = await User.create(user);
//       return res.status(200).json({ message: "User Create Successfully" });
//     }

//     res.status(400).json({ message: "User is  already present." });
//   } catch (error) {
//     console.log(error);
//   }
// };

// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const findUser = await User.findOne({ email: email });
//     if (findUser) {
//       if (findUser.password == password) {
//         return res
//           .status(200)
//           .json({ message: "Login Successful", user: findUser });
//       }
//       return res.status(400).json({ message: "Incorrect password" });
//     }

//     return res.status(404).json({ message: "User not found." });
//   } catch (error) {
//     console.log(error);
//   }
// };
const bcrypt = require('bcrypt');
const User = require('../models/user.js');

exports.registerUser = async (req, res) => {
  try {
    const user = req.body;

    const findUser = await User.findOne({ email: user.email });

    if (!findUser) {
      // Hash the password before storing it in the database
      const hashedPassword = await bcrypt.hash(user.password, 10);

      // Replace the plain text password with the hashed password
      user.password = hashedPassword;

      const newUser = await User.create(user);
      return res.status(200).json({ message: 'User Created Successfully' });
    }

    res.status(400).json({ message: 'User is already present.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email: email });

    if (findUser) {
      // Compare the provided password with the stored hashed password
      const passwordMatch = await bcrypt.compare(password, findUser.password);

      if (passwordMatch) {
        return res.status(200).json({ message: 'Login Successful', user: findUser });
      }

      return res.status(400).json({ message: 'Incorrect password' });
    }

    return res.status(404).json({ message: 'User not found.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
