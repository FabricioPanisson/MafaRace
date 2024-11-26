import { StyleSheet, View, Text, Image, ScrollView, SafeAreaView, TouchableOpacity, event, } from 'react-native';
import React, { useEffect, useState } from 'react';
import BackButton from '../components/BackButton.js';
import { BlurView } from 'expo-blur';
import { supabase } from '../services/supabaseClient.js';

const PageEvent = ({ navigation }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data, error } = await supabase
          .from('race')
          .select('*')
          .eq('mode', 'evento')
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
    navigation.navigate('EventMap', { event }); // Navega para a tela do mapa com os detalhes do evento
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <BackButton navigation={navigation} />
          <View style={styles.titleContainer}>
            <Text style={styles.titleRed}>Explore</Text>
            <Text style={styles.titleBlack}>os</Text>
            <Text style={styles.titleBlack}>eventos</Text>
          </View>
          {events.length === 0 ? (
            <Text style={styles.noEventsText}>Nenhum evento disponível.</Text>
          ) : (
            events.map((event) => (
              <TouchableOpacity
                key={event.id}
                style={styles.viewEvents}
                onPress={() => navigation.navigate('EventMap', { event })}
              >
                <Image
                  source={
                    event.image_url
                      ? { uri: event.image_url }
                      : require("../assets/images/eventoCarros1.jpg")
                  }
                  style={styles.eventImage}
                />
                <BlurView intensity={80} tint="dark" style={styles.absoluteBlur}>
                  <Text style={styles.bodyText}>{event.event_name}</Text>
                  <Text style={styles.bodyText}>
                    {new Date(event.datetime).toLocaleString()}
                  </Text>
                  <Text style={styles.bodyText}>{event.location}</Text>
                </BlurView>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: '20%',
  },
  titleRed: {
    fontSize: 64,
    fontWeight: 'bold',
    fontFamily: 'Montserrat-SemiBold',
    textAlign: 'center',
    color: '#FD0100',
  },
  titleBlack: {
    fontSize: 64,
    marginTop: -20,
    fontWeight: 'bold',
    fontFamily: 'Montserrat-SemiBold',
    textAlign: 'center',
    color: '#1C191F',
  },
  bodyText: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
    color: '#FAFEFF',
  },
  absoluteBlur: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  viewEvents: {
    position: 'relative',
    width: '90%',
    borderRadius: 25,
    overflow: 'hidden',
    marginVertical: 20,
  },
  eventImage: {
    width: '100%',
    height: 200,
  },
});

export default PageEvent;
