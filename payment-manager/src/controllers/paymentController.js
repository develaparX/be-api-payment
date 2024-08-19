const { sendMoney, withdraw,getTransactionsByUserId } = require('../services/paymentService');

async function handleSendMoney(request, reply) {
  const { fromAccountId, toAccountId, amount, currency } = request.body;
  const userId = request.user.id; // Assuming middleware sets user object
  const token = request.headers.authorization; // Assuming token is in Authorization header

  try {
    const transaction = await sendMoney(fromAccountId, toAccountId, amount, currency, userId, token);
    reply.code(200).send(transaction);
  } catch (error) {
    console.error('Error sending money:', error);
    reply.code(400).send({ message: error.message });
  }
}

async function handleWithdraw(request, reply) {
  const { accountId, amount, currency } = request.body;
  const userId = request.user.id; // Assuming middleware sets user object
  const token = request.headers.authorization; // Assuming token is in Authorization header

  try {
    const transaction = await withdraw(accountId, amount, currency, userId, token);
    reply.code(200).send(transaction);
  } catch (error) {
    console.error('Error withdrawing money:', error);
    reply.code(400).send({ message: error.message });
  }
}

async function getAccountTransactions(request, reply) {
  const userId = request.user.id; // Assuming middleware sets user object

  try {
    const transactions = await getTransactionsByUserId(userId);
    reply.code(200).send(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    reply.code(500).send({ message: 'Internal server error' });
  }
}

module.exports = {
  handleSendMoney,
  handleWithdraw,
  getAccountTransactions,
};