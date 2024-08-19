const fastify = require('fastify')({ logger: true });
const authRoutes = require('./routes/auth');
const accountRoutes = require('./routes/accounts');
const transactionRoutes = require('./routes/transactions');

fastify.register(authRoutes);
fastify.register(accountRoutes);
fastify.register(transactionRoutes);

const start = async () => {
  try {
    await fastify.listen(3000, '0.0.0.0');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();