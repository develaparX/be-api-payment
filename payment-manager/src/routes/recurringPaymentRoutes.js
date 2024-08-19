const { handleSetupRecurringPayment } = require('../controllers/recurringPaymentController');

async function recurringPaymentRoutes(fastify, options) {
  fastify.post('/setup-recurring-payment', { preHandler: [fastify.authenticate] }, handleSetupRecurringPayment);
}

module.exports = recurringPaymentRoutes;