const fastify = require('fastify')({ logger: true });
const auth = require('./middleware/auth');
const paymentRoutes = require('./routes/paymentRoutes');
const recurringPaymentRoutes = require('./routes/recurringPaymentRoutes');
const errorHandler = require('./utils/errorHandler');

fastify.register(auth);
fastify.register(paymentRoutes, { prefix: '/api/payments' });
fastify.register(recurringPaymentRoutes, { prefix: '/api/recurring-payments' });

fastify.setErrorHandler(errorHandler);

module.exports = fastify;