const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require("../lib/cloudinary");
require("dotenv").config();
const { sendForgotEmail } = require("../lib/emailServices");
// Create and Save a new User with password encryption and JWT token and session and cookie
exports.create =async(req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }


  //check if email already exists
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist)
    return res
      .status(200)
      .json({ code: 200, success: true, message: "Email already available" });

  // Encrypt password
  const saltRounds = 10;
  const myPlaintextPassword = req.body.password;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(myPlaintextPassword, salt);

  // Create a User
  const user = new User({
    password: hash,
    email: req.body.email,
  });

  // Save User in the database
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        code: 500,
        success: false,
        message: err.message || "Some error occurred while creating the User.",
      });


    else {
      const token = jwt.sign(
        {
          id: data.id,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: 86400,
        }
      );

      req.session.user = data;

      res.cookie("token", token, {
        maxAge: 86400000,
      });
      // res.send(data);
      res.status(200).json({
        code: 200,
        success: true,
        token: token,
        data : data,
        message: "User was registered successfully!",
      });
    }
  });
};

// login user with session and cookie
exports.login = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user) {
      res.status(404).send({
        code : 404,
        success: false,
        message: "User Not found.",
      });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        code : 401,
        success: false,
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: 86400, // 24 hours
      }
    );

    req.session.user = user;

    res.cookie("token", token, {
      maxAge: 86400000,
    });

    res.status(200).json({
      code: 200,
      success: true,
      token: token,
      data : user,
      message: "User was logged in successfully!",
    });


  } catch (error) {
    console.log(error);
  }
};

//edit user  with session and cookie and JWT token
exports.edit = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    let result;

    if (req.file) {
      result = await cloudinary.uploader.upload(req.file.path);
    }
    const data = {
      firstName: req.body.firstName || user.firstName,
      lastName: req.body.lastName || user.lastName,
      mobile: req.body.mobile || user.mobile,
      address: req.body.address || user.address,
      image: result ? result.secure_url : user.image,
    };

    User.findByIdAndUpdate(req.params.id, data, {
      new: true,
    })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            code: 404,
            success: false,
            message: `Cannot update. Maybe User was not found!`,
          });
        } else
          res.status(200).send({

            code: 200,
            success: true,
            message: "User was updated successfully.",
          });
      })
      .catch((err) => {
        res.status(500).send({
          code: 500,
          success: false,
          message: "Error updating User with id=" + id,
        });
      });
  } catch (error) {
    console.log(error);
  }
};

// Retrieve all Users from the database with session and cookie and JWT token.
exports.findAll = async(req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      code: 200,
      success: true,
      users: users,
      message: "Users fetched successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};

// Find a single User with an id with session and cookie and JWT token.
exports.findOne = (req, res) => {
  User.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

//logout user with session and cookie and JWT token
exports.logout = (req, res) => {
  req.session.destroy();
  res.clearCookie("token");
  res.send({
    message: "User was logged out successfully!",
  });
};

exports.forgotPassword = async function (req, res, next) {
  const { email } = req.body;
  try {
    const user = await User.findOne({
      email,
    });
    if (!user) {
      return res.status(404).send({
        message: "User Not found.",
      });
    }
    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: 86400, // 24 hours
      }
    );
    const url = `https://serviceapp.up.railway.app/user/reset-password/${token}`;
    sendForgotEmail(user.email, url, "Reset Password");
    res.status(200).json({

      code: 200,
      success: true,
      message: "Email has been sent, kindly follow the instructions",
    });
  } catch (error) {}
};

//ResetPassword  /reset-password/:id/:token
exports.resetPassword = async function (req, res, next) {
  const { password } = req.body;
  const { token } = req.params;
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).send({
        message: "User Not found.",
      });
    }
    const saltRounds = 10;
    const myPlaintextPassword = password;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(myPlaintextPassword, salt);
    user.password = hash;
    await user.save();
    res.status(200).json({
      code: 200,
      success: true,
      message: "Password has been changed",
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      success: false,
      message: "Error in reset password",
    });
  }
};

//delete user with session and cookie and JWT token
exports.delete = (req, res) => {
  try {
    const id = req.params.id;
    User.remove(id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${id}.`,
          });
        } else {
          res.status(500).send({
            code: 500,
            success: false,
            message: "Could not delete User with id " + id,
          });
        }
      } else
        res.status(200).send({
          code: 200,
          success: true,
          message: `User was deleted successfully!`,
        });
    });
  } catch (error) {
    console.log(error);
  }
};
