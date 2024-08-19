const prisma = require('../models');
const { debitAccountBalance, creditAccountBalance, getAccountBalance, recordTransactionHistory } = require('./accountService');

function processTransaction(transaction) {
  return new Promise((resolve, reject) => {
    console.log('Transaction processing started for:', transaction);
    
    // Simulate long running process
    setTimeout(() => {
      console.log('transaction processed for:', transaction);
      resolve(transaction);
    }, 30000); // 30 seconds
  });
}

async function createTransaction(data) {
  return prisma.transaction.create({ data });
}

async function updateTransaction(id, data) {
  return prisma.transaction.update({
    where: { id },
    data
  });
}

async function getTransactionsByUserId(userId) {
  return prisma.transaction.findMany({
    where: { userId },
    orderBy: { timestamp: 'desc' }
  });
}

async function sendMoney(fromAccountId, toAccountId, amount, currency, userId, token) {
  // Get sender's balance (User A)
  const senderBalance = await getAccountBalance(fromAccountId, token);
  if (senderBalance < amount) {
    throw new Error('Insufficient funds');
  }

  // Create transaction in 'PENDING' status
  const transaction = await createTransaction({
    fromAccountId,
    toAddress: toAccountId,
    amount,
    currency,
    status: 'PENDING',
    type: 'SEND',
    userId
  });

  try {
    // Process the transaction with 30-second delay
    await processTransaction(transaction);

    // Deduct sender's balance (User A) with token authorization
    await debitAccountBalance(fromAccountId, amount, token);

    // Add to recipient's balance (User B) using internal API key
    await creditAccountBalance(toAccountId, amount);

    // Update transaction status to 'COMPLETED'
    const updatedTransaction = await updateTransaction(transaction.id, { status: 'COMPLETED' });

    // Record transaction history in account-manager
    await recordTransactionHistory(updatedTransaction);

    return updatedTransaction;
  } catch (error) {
    // If error occurs, set transaction status to 'FAILED'
    const updatedTransaction = await updateTransaction(transaction.id, { status: 'FAILED' });
    await recordTransactionHistory(updatedTransaction);
    throw error;
  }
}

async function withdraw(accountId, amount, currency, userId, token) {
  // Get account balance
  const balance = await getAccountBalance(accountId, token);
  if (balance < amount) {
    throw new Error('Insufficient funds');
  }

  // Create transaction in 'PENDING' status
  const transaction = await createTransaction({
    fromAccountId: accountId,
    toAddress: null,
    amount: amount,
    currency,
    status: 'PENDING',
    type: 'WITHDRAW',
    userId
  });

  try {
    // Process the transaction with 30-second delay
    await processTransaction(transaction);

    // Deduct account balance with token authorization
    await debitAccountBalance(accountId, amount, token);

    // Update transaction status to 'COMPLETED'
    const updatedTransaction = await updateTransaction(transaction.id, { status: 'COMPLETED' });

    // Record transaction history in account-manager
    await recordTransactionHistory(updatedTransaction);

    return updatedTransaction;
  } catch (error) {
    // If error occurs, set transaction status to 'FAILED'
    const updatedTransaction = await updateTransaction(transaction.id, { status: 'FAILED' });
    await recordTransactionHistory(updatedTransaction);
    throw error;
  }
}

module.exports = {
  sendMoney,
  withdraw,
  getTransactionsByUserId,
};