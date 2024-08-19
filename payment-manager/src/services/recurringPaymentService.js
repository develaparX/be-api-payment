const prisma = require('../models'); // Mengimpor Prisma client

async function createRecurringPayment(data) {
  return prisma.recurringPayment.create({ data });
}

async function getAllRecurringPaymentsByUserId(userId) {
  return prisma.recurringPayment.findMany({
    where: { userId, active: true },
    orderBy: { nextPaymentDate: 'asc' }
  });
}

async function deactivateRecurringPayment(id) {
  return prisma.recurringPayment.update({
    where: { id },
    data: { active: false }
  });
}

async function processRecurringPayments() {
  const now = new Date();

  // Cari semua recurring payment yang aktif dan waktunya untuk diproses
  const recurringPayments = await prisma.recurringPayment.findMany({
    where: {
      active: true,
      nextPaymentDate: {
        lte: now
      }
    }
  });

  for (const payment of recurringPayments) {
    try {
      // Melakukan transaksi SEND
      await sendMoney(payment.accountId, payment.toAccountId, payment.amount, payment.currency, payment.userId, 'Internal API Key');
      
      // Update nextPaymentDate dan lastPaymentDate
      let nextPaymentDate = calculateNextPaymentDate(payment.nextPaymentDate, payment.interval);
      await prisma.recurringPayment.update({
        where: { id: payment.id },
        data: {
          lastPaymentDate: now,
          nextPaymentDate: nextPaymentDate
        }
      });
    } catch (error) {
      console.error(`Failed to process recurring payment ${payment.id}:`, error);
      // Jika terjadi kesalahan, status active tetap true agar bisa dicoba lagi nanti.
    }
  }
}

function calculateNextPaymentDate(currentDate, interval) {
  let nextDate = new Date(currentDate);
  switch (interval) {
    case 'DAILY':
      nextDate.setDate(nextDate.getDate() + 1);
      break;
    case 'WEEKLY':
      nextDate.setDate(nextDate.getDate() + 7);
      break;
    case 'MONTHLY':
      nextDate.setMonth(nextDate.getMonth() + 1);
      break;
    default:
      throw new Error('Invalid interval');
  }
  return nextDate;
}

module.exports = {
  createRecurringPayment,
  getAllRecurringPaymentsByUserId,
  deactivateRecurringPayment,
  processRecurringPayments
};
