const prisma = require('../models');


async function getAccounts(userId) {
  try {
    return await prisma.account.findMany({
      where: { userId },
    });
  } catch (error) {
    console.error('Error fetching accounts:', error);
    throw new Error('Failed to fetch accounts');
  }
}

async function createAccount(userId, accountType) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error(`User with id ${userId} not found`);
    }

    const newAccount = await prisma.account.create({
      data: {
        userId,
        accountType,
        balance: 0,
      },
    });

    console.log('New account created:', newAccount);
    return newAccount;

  } catch (error) {
    console.error('Error creating account:', error);
    throw new Error('Failed to create account');
  }
}

async function updateAccount(userId, accountId, accountType, balance) {
  try {
    const account = await prisma.account.findUnique({
      where: { id: accountId },
    });

    if (!account || account.userId !== userId) {
      throw new Error('Account not found or access denied');
    }

    const updatedAccount = await prisma.account.update({
      where: { id: accountId },
      data: { accountType,balance },
    });

    console.log('Account updated:', updatedAccount);
    return updatedAccount;

  } catch (error) {
    console.error('Error updating account:', error);
    throw new Error('Failed to update account');
  }
}

async function deleteAccount(userId, accountId) {
  try {
    const account = await prisma.account.findUnique({
      where: { id: accountId },
    });

    if (!account || account.userId !== userId) {
      throw new Error('Account not found or access denied');
    }

    await prisma.account.delete({
      where: { id: accountId },
    });

    console.log(`Account with id ${accountId} deleted`);

  } catch (error) {
    console.error('Error deleting account:', error);
    throw new Error('Failed to delete account');
  }
}

// Get account by ID
async function getAccountById(accountId) {
    try {
        const account = await prisma.account.findUnique({
            where: { id: accountId },
        });

        if (!account) {
            throw new Error(`Account with id ${accountId} not found`);
        }

        return account;
    } catch (error) {
        console.error('Error fetching account by id:', error);
        throw new Error('Failed to fetch account by id');
    }
}


async function debitAccountBalance(accountId, amount) {
  try {
    // Ambil account pengirim
    const account = await prisma.account.findUnique({
      where: { id: accountId },
    });

    if (!account) {
      throw new Error('Account not found');
    }

    if (account.balance < amount) {
      throw new Error('Insufficient balance in account');
    }

    // Kurangi saldo akun
    const updatedAccount = await prisma.account.update({
      where: { id: accountId },
      data: { balance: account.balance - amount },
    });

    console.log('Debit successful:', updatedAccount);
    return updatedAccount;

  } catch (error) {
    console.error('Error debiting account balance:', error);
    throw new Error('Failed to debit account balance');
  }
}

async function creditAccountBalance(accountId, amount) {
  try {
    // Ambil account penerima
    const account = await prisma.account.findUnique({
      where: { id: accountId },
    });

    if (!account) {
      throw new Error('Account not found');
    }

    // Tambahkan saldo akun
    const updatedAccount = await prisma.account.update({
      where: { id: accountId },
      data: { balance: account.balance + amount },
    });

    console.log('Credit successful:', updatedAccount);
    return updatedAccount;

  } catch (error) {
    console.error('Error crediting account balance:', error);
    throw new Error('Failed to credit account balance');
  }
}


module.exports = {
  getAccounts,
  createAccount,
  updateAccount,
  deleteAccount,
  getAccountById,
  debitAccountBalance,
  creditAccountBalance
};

