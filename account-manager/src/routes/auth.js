// authRoutes.js
const { authenticateToken} = require('../utils/auth');
const authController = require('../controllers/authController');

async function authRoutes(fastify, options) {
  fastify.post('/register', authController.register);
  fastify.post('/login', authController.login);
  fastify.post('/logout',{ preHandler: authenticateToken },  authController.logout);
}

module.exports = authRoutes;
