const { body } = require('express-validator');

exports.validate = (method) => {
  switch (method) {
    case 'createUser': {
      return [
        body('username', 'userName doesn\'t exists').notEmpty().exists(),
        body('email', 'Invalid email').notEmpty().exists().isEmail(),
        body('name').notEmpty(),
        body('password').notEmpty().isLength({ min: 6 }),
      ];
    }
    case 'updateUser': {
      return [
        body('name').notEmpty(),
        body('password').notEmpty().isLength({ min: 6 }),
      ];
    }
    default:
      return null;
  }
};
