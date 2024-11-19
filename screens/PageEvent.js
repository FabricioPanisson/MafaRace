import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
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

  return (
    <ScrollView>
      <View style={styles.container}>
        <BackButton navigation={navigation} />
        <View style={styles.titleContainer}>
          <Text style={styles.titleRed}>Explore</Text>
          <Text style={styles.titleBlack}>os</Text>
          <Text style={styles.titleBlack}>eventos</Text>
        </View>
        {events.map((event) => (
          <View key={event.id} style={styles.viewEvents}>
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
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
    position: 'relative',
    minWidth: '50%',
    minHeight: '10%',
    borderRadius: 25,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  viewEvents: {
    position: 'relative',
    width: '90%',
    borderRadius: 25,
    overflow: 'hidden',
    marginTop: '10%',
  },
  eventImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
});

export default PageEvent;