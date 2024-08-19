const { authenticateToken, verifyInternalApiKey } = require('../utils/auth');
const accountController = require('../controllers/accountController');

async function accountRoutes(fastify, options) {
  fastify.get('/accounts', { preHandler: authenticateToken }, accountController.getAccounts);
  fastify.get('/accounts/:accountId', { preHandler: authenticateToken }, accountController.getAccountById);
  fastify.post('/accounts', { preHandler: authenticateToken }, accountController.createAccount);
  fastify.put('/accounts/:accountId', { preHandler: authenticateToken }, accountController.updateAccount);
  fastify.delete('/accounts/:accountId', { preHandler: authenticateToken }, accountController.deleteAccount);

  // for transactions
  fastify.put('/accounts/:accountId/debit', { preHandler: [authenticateToken] }, accountController.debitAccount);
  fastify.put('/accounts/:accountId/credit', { preHandler: [verifyInternalApiKey] }, accountController.creditAccount);
}

module.exports = accountRoutes;
