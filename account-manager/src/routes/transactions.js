// routes/transactionRoutes.js
const { authenticateToken, verifyInternalApiKey } = require('../utils/auth');
const transactionController = require('../controllers/transactionController');

async function transactionRoutes(fastify, options) {
  fastify.get('/transactions/:accountId', { preHandler: authenticateToken }, transactionController.getTransactions);
  fastify.put('/transactions/:transactionId', { preHandler: authenticateToken }, transactionController.updateTransaction);
  fastify.delete('/transactions/:transactionId', { preHandler: authenticateToken }, transactionController.deleteTransaction);
  fastify.post('/transaction-history', { preHandler: verifyInternalApiKey }, transactionController.addTransactionHistory);
}

module.exports = transactionRoutes;
