const accountService = require('../services/accountService');

async function getAccounts(req, reply) {
  const userId = req.user.id;
  const accounts = await accountService.getAccounts(userId);
  reply.send(accounts);
}

// Function ini tetap sama
async function createAccount(req, reply) {
  try {
    const userId = req.user.id;
    const { accountType } = req.body;

    const account = await accountService.createAccount(userId, accountType);
    reply.code(201).send(account);
  } catch (error) {
    reply.code(500).send({ error: error.message });
  }
}

// Function ini tetap sama
async function updateAccount(req, reply) {
  try {
    const userId = req.user.id;
    const { accountId } = req.params;
    const { accountType, balance } = req.body;

    const updatedAccount = await accountService.updateAccount(userId, accountId, accountType, balance);
    reply.code(200).send(updatedAccount);
  } catch (error) {
    reply.code(500).send({ error: error.message });
  }
}

// Function ini tetap sama
async function deleteAccount(req, reply) {
  try {
    const userId = req.user.id;
    const { accountId } = req.params;

    await accountService.deleteAccount(userId, accountId);
    reply.code(204).send();
  } catch (error) {
    reply.code(500).send({ error: error.message });
  }
}

// Function ini tetap sama
async function getAccountById(req, reply) {
  try {
    const accountId = req.params.accountId;
    const account = await accountService.getAccountById(accountId);
    reply.send(account);
  } catch (error) {
    reply.code(500).send({ error: error.message });
  }
}

// Function baru untuk internal API

// Fungsi untuk mengurangi saldo akun (debit)
async function debitAccount(req, reply) {
  try {
    const { amount } = req.body;
    const accountId = req.params.accountId; // Mengambil accountId dari parameter URL

    if (!accountId || !amount) {
      reply.code(400).send({ error: 'Account ID and amount are required' });
      return;
    }

    const updatedAccount = await accountService.debitAccountBalance(accountId, amount, req.headers.authorization);
    reply.code(200).send(updatedAccount);
  } catch (error) {
    reply.code(500).send({ error: error.message });
  }
}

// Fungsi untuk menambahkan saldo akun (credit)
async function creditAccount(req, reply) {
  try {
    const { amount } = req.body;
    const accountId = req.params.accountId; // Mengambil accountId dari parameter URL

    if (!accountId || !amount) {
      reply.code(400).send({ error: 'Account ID and amount are required' });
      return;
    }

    const updatedAccount = await accountService.creditAccountBalance(accountId, amount);
    reply.code(200).send(updatedAccount);
  } catch (error) {
    reply.code(500).send({ error: error.message });
  }
}



module.exports = {
  getAccounts,
  createAccount,
  updateAccount,
  deleteAccount,
  getAccountById,
  debitAccount,
  creditAccount,
};
