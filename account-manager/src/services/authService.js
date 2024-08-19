const supabase = require('../config/supabase');
const prisma = require('../models');
const { hashPassword } = require('../utils/encrypt');

async function registerWithEmail(email, password) {
  const { user, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;

  // Enkripsi password sebelum menyimpannya ke database
  const hashedPassword = await hashPassword(password);

  // Simpan user ke database PostgreSQL
  const savedUser = await prisma.user.create({
    data: {
      id: user.id,  // Gunakan ID dari Supabase
      email: user.email,
      password: hashedPassword, // Simpan password yang sudah terenkripsi
    },
  });

  return savedUser;
}

async function loginWithEmail(email, password) {
  const { session, error } = await supabase.auth.signIn({
    email,
    password,
  });

  if (error) throw error;
  return session;
}

async function logout(token) {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}


module.exports = {
  registerWithEmail,
  loginWithEmail,
  logout,
};