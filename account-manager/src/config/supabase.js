const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://aqtmqxsvmbugmuskfjlr.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxdG1xeHN2bWJ1Z211c2tmamxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM5MzYzNTIsImV4cCI6MjAzOTUxMjM1Mn0.W65KFdsdHoR4VbN2W8CUr9gj-kaY-JMtw0x9wNfS568";

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

module.exports = supabase;