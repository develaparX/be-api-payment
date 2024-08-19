// authController.js
const authService = require('../services/authService');

exports.register = async (request, reply) => {
  const { email, password } = request.body;
  const user = await authService.registerWithEmail(email, password);
  reply.send(user);
};

exports.login = async (request, reply) => {
  const { email, password } = request.body;
  const session = await authService.loginWithEmail(email, password);
  reply.send(session);
};

exports.logout = async (request, reply) => {
  const { token } = request.body;
  await authService.logout(token);
  reply.send({ success: true });
};
