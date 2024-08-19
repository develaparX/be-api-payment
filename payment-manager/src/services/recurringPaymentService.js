const prisma = require('../models');
const { updateAccountBalance, getAccountBalance } = require('./accountService');
const { processTransaction } = require('./paymentService');

async function createRecurringPayment(data) {
  return prisma.recurringPayment.create({ data });
}

async function getOverdueRecurringPayments() {
  const now = new Date();
  return prisma.recurringPayment.findMany({
    where: {
      nextPaymentDate: {
        lte: now,
      },
    },
  });
}

async function updateRecurringPayment(id, data) {
  return prisma.recurringPayment.update({
    where: { id },
    data
  });
}

function getIntervalInMilliseconds(interval) {
  const intervals = {
    DAILY: 24 * 60 * 60 * 1000,
    WEEKLY: 7 * 24 * 60 * 60 * 1000,
    MONTHLY: 30 * 24 * 60 * 60 * 1000
  };
  return intervals[interval] || intervals.MONTHLY;
}

async function processRecurringPayments() {
  const duePayments = await getOverdueRecurringPayments();

  for (const payment of duePayments) {
    try {
      const balance = await getAccountBalance(payment.accountId, 'system_token');
      if (balance < payment.amount) {
        console.log(`Insufficient funds for recurring payment ${payment.id}`);
        continue;
      }

      const transaction = await prisma.transaction.create({
        data: {
          fromAccountId: payment.accountId,
          toAddress: 'RECURRING_PAYMENT',
          amount: payment.amount,
          currency: payment.currency,
          status: 'PENDING',
        },
      });

      await processTransaction(transaction);

      await updateAccountBalance(payment.accountId, -payment.amount, 'system_token');

      await updateRecurringPayment(payment.id, {
        nextPaymentDate: new Date(payment.nextPaymentDate.getTime() + getIntervalInMilliseconds(payment.interval)),
      });
    } catch (error) {
      console.error(`Error processing recurring payment ${payment.id}:`, error);
    }
  }
}

module.exports = {
  createRecurringPayment,
  processRecurringPayments
};