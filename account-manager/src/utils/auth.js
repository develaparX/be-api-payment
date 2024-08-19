const supabase = require('../config/supabase.js');
const prisma = require('../models/index.js');
require('dotenv').config();

async function authenticateToken(request, reply) {
  const token = request.headers.authorization?.split(' ')[1];

  if (!token) {
    reply.code(401).send({ error: 'Missing token' });
    return;
  }

  const { user, error } = await supabase.auth.api.getUser(token);

  if (error) {
    reply.code(401).send({ error: 'Invalid token' });
    return;
  }

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
  });

  if (!dbUser) {
    reply.code(401).send({ error: 'User not found in database' });
    return;
  }

  request.user = dbUser;
}

function verifyInternalApiKey(request, reply, done) {
  const apiKey = request.headers['authorization'];
  
  if (apiKey === process.env.INTERNAL_API_KEY) {
    done();
  } else {
    reply.code(403).send({ error: 'Forbidden: Invalid API key' });
  }
}

module.exports = {
  authenticateToken,
  verifyInternalApiKey,
};
