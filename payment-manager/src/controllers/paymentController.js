const { sendMoney, withdraw } = require('../services/paymentService');

async function handleSendMoney(request, reply) {
  const { fromAccountId, toAccountId, amount, currency } = request.body;
  const token = request.headers.authorization;

  try {
    const transaction = await sendMoney(fromAccountId, toAccountId, amount, currency, token);
    reply.code(200).send(transaction);
  } catch (error) {
    reply.code(400).send({ error: error.message });
  }
}

async function handleWithdraw(request, reply) {
  const { accountId, amount, currency } = request.body;
  const token = request.headers.authorization;

  try {
    const transaction = await withdraw(accountId, amount, currency, token);
    reply.code(200).send(transaction);
  } catch (error) {
    reply.code(400).send({ error: error.message });
  }
}

module.exports = {
  handleSendMoney,
  handleWithdraw
};
