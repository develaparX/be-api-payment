// routes/transactionRoutes.js
const { authenticateToken, verifyInternalApiKey } = require('../utils/auth');
const transactionController = require('../controllers/transactionController');

async function transactionRoutes(fastify, options) {
  // Read (existing)
  fastify.get('/transactions/:accountId', { preHandler: authenticateToken }, transactionController.getTransactions);

  // Update
  fastify.put('/transactions/:transactionId', { preHandler: authenticateToken }, transactionController.updateTransaction);

  // Delete
  fastify.delete('/transactions/:transactionId', { preHandler: authenticateToken }, transactionController.deleteTransaction);

  // Add Transaction History
  fastify.post('/transaction-history', { preHandler: verifyInternalApiKey }, transactionController.addTransactionHistory);
}

module.exports = transactionRoutes;
