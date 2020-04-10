const bcrypt = require('bcrypt');

const hash = async (password, salt) => bcrypt.hash(password, salt);

module.exports = hash;
