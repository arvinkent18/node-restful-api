const router = require('express').Router();

const apicache = require('apicache');

const UsersController = require('../../controllers/users');

const Validator = require('../../utils/validators/users');

const cache = apicache.middleware;

// @route GET users
// @desc Get users
// @access Public
router.get('/', cache('5 minutes'), UsersController.findAll);

// @route GET users/:id
// @desc Get a user
// @access Public
router.get('/:id', cache('5 minutes'), UsersController.findById);

// @route POST users
// @desc Create a user
// @access Public
router.post('/', Validator.validate('createUser'), UsersController.createUser);

// @route UPDATE users/:id
// @desc Update a user
// @access Public
router.post('/:id', Validator.validate('updateUser'), UsersController.updateUser);

// @route DELETE users/:id
// @desc Delete a user
// @access Public
router.delete('/:id', UsersController.deleteUser);

module.exports = router;
