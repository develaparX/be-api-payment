function errorHandler(error, request, reply) {
  console.error(error);
  reply.status(500).send({ error: 'Internal Server Error' });
}

module.exports = errorHandler;