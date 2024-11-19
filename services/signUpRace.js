import { supabase } from './supabaseClient';

const createRacha = async (adversary, distance) => {
    try {
        const { data, error } = await supabase.from('race').insert([
            {
                mode: 'racha',
                adversary: adversary || null,
                distance: distance,
            },
        ]);

        if (error) {
            console.error('Erro ao cadastrar racha no serviço:', JSON.stringify(error, null, 2));
            throw error;
        }

        return data;
    } catch (err) {
        console.error('Exceção no serviço createRacha:', JSON.stringify(err, null, 2));
        throw err;
    }
};

const createEvento = async (eventName, location, date) => {
    try {
        const formattedDateTime = date.toISOString();

        const { data, error } = await supabase.from('race').insert([
            {
                mode: 'evento',
                event_name: eventName,
                location: location,
                datetime: formattedDateTime,
            },
        ]);

        if (error) {
            console.error('Erro ao cadastrar evento no serviço:', JSON.stringify(error, null, 2));
            throw error;
        }

        return data;
    } catch (err) {
        console.error('Exceção no serviço createEvento:', JSON.stringify(err, null, 2));
        throw err;
    }
};

export const signupsraceService = {
    createRacha,
    createEvento,
};