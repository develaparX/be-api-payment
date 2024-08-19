const axios = require('axios');
const config = require('../config/environment');

// Fungsi untuk mengurangi saldo User A (menggunakan token User A)
async function debitAccountBalance(accountId, amount, token) {
  try {
    const response = await axios.put(
      `${config.accountManagerUrl}/accounts/${accountId}/debit`, // Menggunakan endpoint debit dengan PUT
      { amount },  // Mengirimkan jumlah yang akan didebit
      { headers: { Authorization: `${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error('Error debiting account balance:', error);
    throw error;
  }
}

// Fungsi untuk menambahkan saldo User B (menggunakan internal API key)
async function creditAccountBalance(accountId, amount) {
  try {
    const response = await axios.put(
      `${config.accountManagerUrl}/accounts/${accountId}/credit`, // Menggunakan endpoint credit dengan PUT
      { amount },  // Mengirimkan jumlah yang akan dikredit
      { headers: { Authorization: `${config.internalApiKey}` } }
    );
    return response.data;
  } catch (error) {
    console.error('Error crediting account balance:', error);
    throw error;
  }
}

// Fungsi untuk mendapatkan saldo akun (menggunakan token User)
async function getAccountBalance(accountId, token) {
  try {
    const response = await axios.get(
      `${config.accountManagerUrl}/accounts/${accountId}`,
      { headers: { Authorization: `${token}` } }
    );
    return response.data.balance;
  } catch (error) {
    console.error('Error getting account balance:', error);
    throw error;
  }
}

async function recordTransactionHistory(transaction) {
  try {
    const response = await axios.post(
      `${config.accountManagerUrl}/transaction-history`,
      {
        id:transaction.id,
        fromAccountId: transaction.fromAccountId,
        toAddress: transaction.toAddress || null,  // Change this line
        amount: transaction.amount,
        currency: transaction.currency,
        status: transaction.status,
        type: transaction.type,
      },
      { headers: { Authorization: `${config.internalApiKey}` } }
    );
    console.log('Transaction history recorded successfully', response.data);
  } catch (error) {
    console.error('Failed to record transaction history:', {
      message: error.message,
      response: error.response ? error.response.data : 'No response data',
    });
    if (error.response) {
      console.error('Error status:', error.response.status);
      console.error('Error headers:', error.response.headers);
    }
  }
}

module.exports = {
  debitAccountBalance,
  creditAccountBalance,
  getAccountBalance,
  recordTransactionHistory
};
