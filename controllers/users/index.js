const { validationResult } = require('express-validator');

const bcrypt = require('bcrypt');

const hash = require('../../utils/hash');

const User = require('../../models/User');

exports.findAll = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200)
      .json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500);
  }
};

exports.findById = async (req, res) => {
  const user = await User.findById(req.params.id);
  try {
    if (!user) {
      return res.status(404).json(
        {
          message: 'user not found',
        },
      );
    }
    return res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    return res.status(500);
  }
};

exports.createUser = async (req, res) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.status(422)
      .json({ errors: validationErrors.array() });
  }
  const {
    name,
    email,
    username,
    password,
  } = req.body;
  const foundUser = await User.findOne({ $or: [{ email }, { username }] });
  if (foundUser) {
    return res.status(409).json({ message: `${email} or ${username} already exists` });
  }
  const salt = await bcrypt.genSalt();
  const hashedPassword = await hash(password, salt);
  const user = new User({
    name,
    email,
    username,
    password: hashedPassword,
    salt,
  });
  try {
    await user.save();
    return res.status(201).json(
      {
        message: 'user has been successfully created',
        data: user,
      },
    );
  } catch (err) {
    console.error(err.message);
    return res.status(500);
  }
};

exports.updateUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json(
      {
        message: 'user not found',
      },
    );
  }
  const { name, password } = req.body;
  const salt = await bcrypt.genSalt();
  const hashedPassword = await hash(password, salt);
  try {
    await User.findByIdAndUpdate(
      req.params.id,
      {
        name,
        password: hashedPassword,
      },
    );
    return res.status(200).json(
      {
        message: 'updated user successfully',
      },
    );
  } catch (err) {
    console.error(err.message);
    return res.status(500);
  }
};

exports.deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  try {
    if (!user) {
      return res.status(404).json(
        {
          message: 'user not found',
        },
      );
    }
    await user.remove();
    return res.status(200).json(
      {
        message: 'deleted user successfully',
      },
    );
  } catch (err) {
    console.error(err.message);
    return res.status(500);
  }
};
