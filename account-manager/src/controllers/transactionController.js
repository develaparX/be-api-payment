// controllers/transactionController.js
const accountService = require('../services/accountService');
const transactionService = require('../services/transactionService');

async function getTransactions(req, reply) {
  try {
    const { accountId } = req.params;
    const { userId } = req.user;
    const transactions = await transactionService.getTransactions(accountId, userId);
    reply.send(transactions);
  } catch (error) {
    reply.status(400).send({ error: error.message });
  }
}

async function updateTransaction(req, reply) {
  try {
    const { transactionId } = req.params;
    const { userId } = req.user;
    const updateData = req.body;
    const updatedTransaction = await transactionService.updateTransaction(transactionId, userId, updateData);
    reply.send(updatedTransaction);
  } catch (error) {
    reply.status(400).send({ error: error.message });
  }
}

async function deleteTransaction(req, reply) {
  try {
    const { transactionId } = req.params;
    const { userId } = req.user;
    await transactionService.deleteTransaction(transactionId, userId);
    reply.status(204).send();
  } catch (error) {
    reply.status(400).send({ error: error.message });
  }
}

async function addTransactionHistory(request, reply) {
  try {
    const {Id, fromAccountId, toAddress, amount, currency, status,type } = request.body;

    const transactionHistory = await transactionService.addTransactionHistory({
    Id,
      fromAccountId,
      toAddress,
      amount,
      currency,
      status,
      type
    });

    reply.code(201).send(transactionHistory);
  } catch (error) {
    console.error('Error in addTransactionHistory controller:', {
      message: error.message,
      stack: error.stack
    });
    reply.code(500).send({ error: error.message });
  }
}

module.exports = {
  getTransactions,
  updateTransaction,
  deleteTransaction,
  addTransactionHistory,
};
