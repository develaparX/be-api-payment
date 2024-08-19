const bcrypt = require('bcrypt');

const saltRounds = 10;

async function hashPassword(password) {
  return await bcrypt.hash(password, saltRounds);
}

async function comparePassword(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

module.exports = {
  hashPassword,
  comparePassword,
};
