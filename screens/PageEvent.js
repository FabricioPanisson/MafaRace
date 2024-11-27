import { StyleSheet, View, Text, Image, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import BackButton from '../components/BackButton.js';
import { BlurView } from 'expo-blur';
import { supabase } from '../services/supabaseClient.js';

const PageEvent = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data, error } = await supabase
          .from('race')
          .select('*')
          .order('datetime', { ascending: true });

        if (error) {
          console.error('Erro ao buscar eventos:', error);
        } else {
          setEvents(data);
        }
      } catch (err) {
        console.error('Erro ao buscar eventos:', err);
      }
    };

    fetchEvents();
  }, []);

  const handleEventSelect = (event) => {
    navigation.navigate('EventMap', {
      event: event,
      name: event.event_name,
      distance: event.distance,
    });
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      const { error } = await supabase
        .from('race')
        .delete()
        .eq('id', eventId);

      if (error) {
        console.error('Erro ao excluir evento:', error);
      } else {
        setEvents(events.filter((event) => event.id !== eventId));
      }
    } catch (err) {
      console.error('Erro ao excluir evento:', err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackButton navigation={navigation} />

      {/* Botão para alternar modo de edição */}
      <TouchableOpacity 
        style={styles.editButton} 
        onPress={() => setIsEditing(!isEditing)}
      >
        <Text style={styles.editButtonText}>
          {isEditing ? 'Concluir' : 'Editar'}
        </Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.main}>
          <Image
            source={require("../assets/images/CronometroInicio.png")}
            style={styles.icon}
          />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Explore Eventos</Text>
            <Text style={styles.subtitle}>Descubra os próximos desafios e locais</Text>
          </View>
        </View>

        {/* Renderiza os eventos e rachas */}
        {events.length === 0 ? (
          <Text style={styles.noEventsText}>Nenhum evento disponível.</Text>
        ) : (
          events.map((event) => (
            <View key={event.id} style={styles.eventCard}>
              <TouchableOpacity
                style={styles.eventContent}
                onPress={() => handleEventSelect(event)}
                disabled={isEditing}
              >
                <Image
                  source={
                    event.mode === 'racha'
                      ? require("../assets/images/rachaCarros.jpg") // Imagem para os rachas
                      : event.image_url
                      ? { uri: event.image_url }                 // Imagem customizada para eventos
                      : require("../assets/images/eventoCarros1.jpg") // Imagem padrão para eventos
                  }
                  style={styles.eventImage}
                />

                <BlurView intensity={80} tint="dark" style={styles.eventDetails}>
                  {event.mode === 'racha' ? (
                    <>
                      <Text style={styles.eventTitle}>Racha da Comunidade</Text>
                      <Text style={styles.eventType}>Racha</Text>
                      <Text style={styles.eventDistance}>
                        {event.distance ? `${event.distance} Km` : 'Distância não informada'}
                      </Text>
                    </>
                  ) : (
                    <>
                      <Text style={styles.eventTitle}>{event.event_name}</Text>
                      <Text style={styles.eventType}>Evento</Text>
                      <Text style={styles.eventDate}>
                        {new Date(event.datetime).toLocaleString()}
                      </Text>
                      <Text style={styles.eventLocation}>{event.location}</Text>
                    </>
                  )}
                </BlurView>
              </TouchableOpacity>

              {/* Botão de exclusão no modo de edição */}
              {isEditing && (
                <TouchableOpacity 
                  style={styles.deleteButton} 
                  onPress={() => handleDeleteEvent(event.id)}
                >
                  <Text style={styles.deleteButtonText}>Excluir</Text>
                </TouchableOpacity>
              )}
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  eventDistance: {
    fontSize: 16,
    color: '#fff',
    marginTop: 5,
  },
  scrollContent: {
    paddingTop: 20,
    paddingBottom: 40,
  },
  main: {
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    marginBottom: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'red',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
    marginTop: 10,
  },
  noEventsText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  eventCard: {
    width: '90%',
    borderRadius: 15,
    overflow: 'hidden',
    marginVertical: 10,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventContent: {
    flex: 1,
  },
  eventImage: {
    width: '100%',
    height: 180,
  },
  eventDetails: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 10,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  eventType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  eventDate: {
    fontSize: 14,
    color: '#ccc',
  },
  eventLocation: {
    fontSize: 14,
    color: '#ccc',
  },
  editButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 8,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 8,
    marginLeft: 10,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default PageEvent;
