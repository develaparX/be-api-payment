const prisma = require('../models');
const { debitAccountBalance, creditAccountBalance, getAccountBalance,recordTransactionHistory } = require('./accountService');

async function createTransaction(data) {
  return prisma.transaction.create({ data });
}

async function updateTransaction(id, data) {
  return prisma.transaction.update({
    where: { id },
    data
  });
}



async function sendMoney(fromAccountId, toAccountId, amount, currency, token) {
  // Mendapatkan saldo pengirim (User A)
  const senderBalance = await getAccountBalance(fromAccountId, token);
  if (senderBalance < amount) {
    throw new Error('Insufficient funds');
  }

  // Membuat transaksi dalam status 'PENDING'
  const transaction = await createTransaction({
    fromAccountId,
    toAddress: toAccountId,
    amount,
    currency,
    status: 'PENDING',
    type: 'SEND',
  });

  try {
    // Mengurangi saldo pengirim (User A) dengan otorisasi token
    await debitAccountBalance(fromAccountId, amount, token);

    // Menambahkan saldo penerima (User B) dengan menggunakan internal API key
    await creditAccountBalance(toAccountId, amount);

    // Mengupdate status transaksi menjadi 'COMPLETED'
    const updatedTransaction = await updateTransaction(transaction.id, { status: 'COMPLETED' });

    // Mencatat riwayat transaksi ke transactionHistory di account-manager
    await recordTransactionHistory(updatedTransaction);

    return updatedTransaction;
  } catch (error) {
    // Jika terjadi kesalahan, kembalikan status transaksi menjadi 'FAILED'
    const updatedTransaction = await updateTransaction(transaction.id, { status: 'FAILED' });
    await recordTransactionHistory(updatedTransaction);
    throw error;
  }
}


async function withdraw(accountId, amount, currency, token) {
  // Mendapatkan saldo akun
  const balance = await getAccountBalance(accountId, token);
  if (balance < amount) {
    throw new Error('Insufficient funds');
  }

  // Membuat transaksi dalam status 'PENDING'
  const transaction = await createTransaction({
    fromAccountId: accountId,
    toAddress:null,
    amount: amount, // amount negatif karena ini adalah pengurangan
    currency,
    status: 'PENDING',
    type: 'WITHDRAW',
  });

  try {
    // Mengurangi saldo akun dengan otorisasi token
    await debitAccountBalance(accountId, amount, token);

    // Mengupdate status transaksi menjadi 'COMPLETED'
    const updatedTransaction = await updateTransaction(transaction.id, { status: 'COMPLETED' });

    // Mencatat riwayat transaksi ke transactionHistory di account-manager
     await recordTransactionHistory(updatedTransaction);

    return updatedTransaction;
  } catch (error) {
    // Jika terjadi kesalahan, kembalikan status transaksi menjadi 'FAILED'    const updatedTransaction = await updateTransaction(transaction.id, { status: 'COMPLETED' });
    const updatedTransaction = await updateTransaction(transaction.id, { status: 'FAILED' });
    await recordTransactionHistory(updatedTransaction);
    throw error;
  }
}


module.exports = {
  sendMoney,
  withdraw
};
