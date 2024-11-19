import { supabase } from './supabaseClient';

export const signIn = async ({ email, password }) => {
  try {
    if (!email || !password) {
      throw new Error("Email e senha são obrigatórios.");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("Formato de email inválido.");
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.status === 400 && error.message.includes("Invalid login credentials")) {
        throw new Error("Email ou senha incorretos.");
      } else if (error.status === 404 || error.code === 'auth/user-not-found') {
        throw new Error("Usuário não encontrado.");
      } else if (error.message.includes("Failed to fetch") || error.code === 'PGREST_ERROR') {
        throw new Error("Erro de conexão. Verifique sua internet.");
      } else if (error.code === 'auth/invalid-email') {
        throw new Error("Formato de email inválido.");
      } else if (error.code === 'auth/wrong-password') {
        throw new Error("Senha incorreta.");
      } else {
        console.error('Erro no signIn:', error);
        throw new Error("Erro ao fazer login. Tente novamente mais tarde.");
      }
    }

    if (!data || !data.user) {
      throw new Error("Erro inesperado. Nenhum usuário retornado.");
    }

    return data.user;

  } catch (error) {
    console.error('Erro no signIn:', error);
    throw error;
  }
};

export const signUp = async ({ email, password }) => {
    try {
      if (!email || !password) {
        throw new Error("Email e senha são obrigatórios.");
      }
  
      if (password.length < 6) {
        throw new Error("A senha deve ter pelo menos 6 caracteres.");
      }
  
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error("Formato de email inválido.");
      }
  
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
  
      if (error) {
        if (error.status === 400) {
          if (error.message.includes("Invalid email address")) {
            throw new Error("Formato de email inválido.");
          } else if (error.message.includes("Password should be at least")) {
            throw new Error("A senha deve ter pelo menos 6 caracteres.");
          } else {
            console.error("Erro detalhado do Supabase (signUp):", error);
            throw new Error("Erro ao processar a requisição. Verifique os dados informados.");
          }
        } else if (error.code === 'auth/email-already-in-use') {
          throw new Error("Este email já está cadastrado.");
        } else if (error.message.includes("Failed to fetch")) {
          throw new Error("Erro de conexão. Verifique sua internet.");
        } else {
          console.error('Erro no signUp:', error);
          throw new Error("Erro ao cadastrar. Tente novamente mais tarde.");
        }
      }
  
      if (!data || !data.user) {
        throw new Error("Erro inesperado. Nenhum usuário retornado.");
      }
  
      return data.user;
    } catch (error) {
      console.error('Erro no signUp:', error);
      throw error;
    }
  };