const recurringPaymentService = require('../services/recurringPaymentService');

async function createRecurringPayment(req, res) {
  const userId = req.user.id; // Diperoleh dari middleware
  const { accountId, amount, currency, interval, toAccountId } = req.body;
  console.log(req.body)
  try {
    const recurringPayment = await recurringPaymentService.createRecurringPayment({
      accountId,
      toAccountId,
      amount,
      currency,
      interval,
      userId,
      active: true,
      nextPaymentDate: new Date() // Mulai dari hari ini
    });
    res.status(201).send(recurringPayment);
  } catch (error) {
      console.error('Error creating recurring payment:', error); // Menampilkan detail error
  res.status(500).send({ error: 'Failed to create recurring payment', details: error.message });

  }
}

async function getAllRecurringPayments(req, res) {
  const userId = req.userId; // Diperoleh dari middleware

  try {
    const payments = await recurringPaymentService.getAllRecurringPaymentsByUserId(userId);
    res.status(200).send(payments);
  } catch (error) {
    res.status(500).send({ error: 'Failed to retrieve recurring payments' });
  }
}

async function deactivateRecurringPayment(req, res) {
  const { id } = req.params;

  try {
    await recurringPaymentService.deactivateRecurringPayment(id);
    res.status(200).send({ message: 'Recurring payment deactivated successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Failed to deactivate recurring payment' });
  }
}

module.exports = {
  createRecurringPayment,
  getAllRecurringPayments,
  deactivateRecurringPayment
};
