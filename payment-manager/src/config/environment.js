require('dotenv').config();

module.exports = {
  databaseUrl: process.env.DATABASE_URL,
  port: process.env.PORT || 3001,
  accountManagerUrl: process.env.ACCOUNT_MANAGER_URL,
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
  internalApiKey:process.env.INTERNAL_API_KEY
};