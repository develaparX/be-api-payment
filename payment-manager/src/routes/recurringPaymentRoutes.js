const recurringPaymentController = require('../controllers/recurringPaymentController');

async function recurringPaymentRoutes(fastify, options) {
  fastify.post('/recurring', { preHandler: fastify.authenticate }, recurringPaymentController.createRecurringPayment);
  fastify.get('/recurring', { preHandler: fastify.authenticate }, recurringPaymentController.getAllRecurringPayments);
  fastify.delete('/recurring/:id', { preHandler: fastify.authenticate }, recurringPaymentController.deactivateRecurringPayment);
}

module.exports = recurringPaymentRoutes;
