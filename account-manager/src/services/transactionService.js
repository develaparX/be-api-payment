const prisma = require('../models');


async function getTransactions(accountId, userId) {
  // Temukan akun yang terkait dengan accountId dan userId
  const account = await prisma.account.findFirst({
    where: {
      id: accountId,
      userId: userId, // Pastikan bahwa accountId milik userId yang login
    },
  });

  if (!account) {
    throw new Error('Account not found or not accessible by this user');
  }

  // Ambil semua transaksi terkait accountId
  return prisma.transactionHistory.findMany({
    where: { fromAccountId: accountId },
  });
}

async function updateTransaction(transactionId, userId, updateData) {
  const transaction = await prisma.transactionHistory.findFirst({
    where: {
      id: transactionId,
      account: {
        userId: userId,
      },
    },
  });

  if (!transaction) {
    throw new Error('Transaction not found or not accessible by this user');
  }

  return prisma.transactionHistory.update({
    where: { id: transactionId },
    data: updateData,
  });
}

async function deleteTransaction(transactionId, userId) {
  const transaction = await prisma.transactionHistory.findFirst({
    where: {
      id: transactionId,
      account: {
        userId: userId,
      },
    },
  });

  if (!transaction) {
    throw new Error('Transaction not found or not accessible by this user');
  }

  return prisma.transactionHistory.delete({
    where: { id: transactionId },
  });
}


async function addTransactionHistory(data) {
  try {
    const newHistory = await prisma.transactionHistory.create({
      data: {
        id: data.Id,
        fromAccountId: data.fromAccountId,
        toAddress: data.toAddress || null, // Menggunakan `toAccountId`
        amount: data.amount,
        currency: data.currency,
        status: data.status,
        type: data.type,
        timestamp: data.timestamp || new Date(),
      },
    });
    return newHistory;
  } catch (error) {
    console.error('Detailed Error adding transaction history:', error);
    throw new Error('Failed to add transaction history');
  }
}


module.exports = {
  getTransactions,
  updateTransaction,
  deleteTransaction,
  addTransactionHistory,
};
