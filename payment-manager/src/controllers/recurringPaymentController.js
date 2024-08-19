const { createRecurringPayment } = require('../services/recurringPaymentService');

async function handleSetupRecurringPayment(request, reply) {
  const { accountId, amount, currency, interval } = request.body;

  try {
    const recurringPayment = await createRecurringPayment({
      accountId,
      amount,
      currency,
      interval,
      nextPaymentDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });
    reply.code(200).send(recurringPayment);
  } catch (error) {
    reply.code(400).send({ error: error.message });
  }
}

module.exports = {
  handleSetupRecurringPayment
};