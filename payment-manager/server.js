const app = require('./src/app');
const config = require('./src/config/environment');

const start = async () => {
  try {
    await app.listen({ port: config.port });
    app.log.info(`server listening on ${app.server.address().port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();