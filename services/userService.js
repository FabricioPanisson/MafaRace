// services/userService.js

import { supabase } from './supabaseClient';

export const signUp = async ({ email, password, username, full_name }) => {
  try {
    if (!email || !password || !username || !full_name) {
      throw new Error('Todos os campos são obrigatórios.');
    }

    // Cria o usuário no sistema de autenticação do Supabase
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      console.error('Erro ao criar usuário:', signUpError);
      throw new Error(signUpError.message || 'Não foi possível criar o usuário. Tente novamente.');
    }

    if (!signUpData.user) {
      throw new Error('Não foi possível criar o usuário. O e-mail já está em uso.');
    }

    const userId = signUpData.user.id;

    // Usa upsert para inserir ou atualizar o perfil
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .upsert({
        id: userId,
        username,
        full_name,
      });

    if (profileError) {
      console.error('Erro ao inserir/atualizar perfil do usuário:', profileError);
      throw new Error(profileError.message || 'Não foi possível salvar os dados do usuário.');
    }

    return signUpData.user;
  } catch (error) {
    console.error('Erro no signUp:', error);
    throw error;
  }
};
