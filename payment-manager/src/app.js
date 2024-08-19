const fastify = require('fastify')({ logger: true });
const auth = require('./middleware/auth');
const paymentRoutes = require('./routes/paymentRoutes');
const recurringPaymentRoutes = require('./routes/recurringPaymentRoutes');
const errorHandler = require('./utils/errorHandler');
const cron = require('node-cron');
const recurringPaymentService = require('./services/recurringPaymentService');

// Register middleware
fastify.register(auth);

// Register routes
fastify.register(paymentRoutes, { prefix: '/api/payments' });
fastify.register(recurringPaymentRoutes, { prefix: '/api/payments' }); // Register recurring payment routes

// Set custom error handler
fastify.setErrorHandler(errorHandler);

// Start cron job for processing recurring payments every hour
cron.schedule('0 * * * *', () => {
  recurringPaymentService.processRecurringPayments()
    .then(() => fastify.log.info('Processed recurring payments'))
    .catch(err => fastify.log.error('Error processing recurring payments:', err));
});

module.exports = fastify;
