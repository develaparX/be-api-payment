const { createClient } = require('@supabase/supabase-js');
const fp = require('fastify-plugin');
const config = require('../config/environment');

const supabase = createClient(config.supabaseUrl, config.supabaseAnonKey);

async function authenticate(request, reply) {
  const token = request.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    reply.code(401).send({ error: 'Missing authentication token' });
    return;
  }

  try {
    console.log('Token received:', token);
    const { data, error } = await supabase.auth.getUser(token);

    if (error) throw error;

    console.log('User data:', data);
    request.user = data.user;
  } catch (error) {
    console.error('Authentication error:', error);
    reply.code(401).send({ error: 'Invalid authentication token' });
  }
}


module.exports = fp(async function (fastify, opts) {
  fastify.decorate('authenticate', authenticate);
});