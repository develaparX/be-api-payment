const paymentController = require('../controllers/paymentController');

async function paymentRoutes(fastify, options) {
   fastify.get('/transactions', { preHandler: fastify.authenticate }, paymentController.getAccountTransactions);
  fastify.post('/send', { preHandler: fastify.authenticate }, paymentController.handleSendMoney);
  fastify.post('/withdraw', { preHandler: fastify.authenticate }, paymentController.handleWithdraw);
}

module.exports = paymentRoutes;