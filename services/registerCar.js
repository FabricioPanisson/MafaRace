import { supabase } from './supabaseClient';

export const registerCar = async ({ userId, model, color, year, power }) => {
    try {
      if (!userId || !model || !color || !year || !power) {
        throw new Error('Todos os campos são obrigatórios.');
      }
  
      const { data, error } = await supabase
        .from('cars')
        .insert([
          {
            user_id: userId,
            model,
            color,
            year,
            power,
          },
        ])
        .select(); // Adiciona esta parte
  
  
      if (error) {
        console.error('Erro ao registrar o carro:', error);
        throw new Error(error.message || 'Não foi possível registrar o carro. Tente novamente.');
      }
  
      if (!data || data.length === 0) {
        console.error('Nenhum dado retornado ao registrar o carro:', data);
        throw new Error('Não foi possível registrar o carro. Verifique suas permissões.');
      }
  
      return data;
    } catch (error) {
      console.error('Erro no registerCar:', error);
      throw error;
    }
  };