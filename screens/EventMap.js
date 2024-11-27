import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';

const EventMap = ({ route }) => {
  const { event } = route.params;

  // Coordenadas de exemplo em Passo Fundo
  const coordinates = [
    { latitude: -28.26916129433125, longitude: -52.425179990692 }, // Ponto de partida (exemplo)
    { latitude: -28.2669354665173, longitude: -52.41988037089626 },
    { latitude: -28.264813078741838, longitude: -52.41514594888647 },
    { latitude: -28.2623686964428, longitude: -52.41020915041962 },
    { latitude: -28.259061769072673, longitude: -52.40338280443629 }, // Ponto de chegada (exemplo)
  ];

  const eventDate = new Date(event.datetime);
  const formattedDate = eventDate.toLocaleDateString('pt-BR');
  const formattedTime = eventDate.toLocaleTimeString('pt-BR');

  // Função para abrir o Google Maps no ponto de partida
  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps?q=${coordinates[0].latitude},${coordinates[0].longitude}`;
    Linking.openURL(url).catch((err) => console.error('Erro ao abrir o Google Maps:', err));
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: coordinates[0].latitude,
          longitude: coordinates[0].longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Polyline
          coordinates={coordinates}
          strokeColor="#FF0000"
          strokeWidth={3}
        />
      </MapView>

      <View style={styles.eventInfo}>
        <Text style={styles.eventName}>{event.event_name}</Text>
        <Text style={styles.eventDate}>{formattedDate}</Text>
        <Text style={styles.eventTime}>{formattedTime}</Text>
      </View>

      {/* Botão para abrir o Google Maps */}
      <TouchableOpacity style={styles.button} onPress={openGoogleMaps}>
        <Text style={styles.buttonText}>Traçar rota até o evento</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  eventInfo: {
    position: 'absolute',
    bottom: 80, // Ajustado para criar espaço entre a info do evento e o botão
    left: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semitransparente
    padding: 15,
    borderRadius: 10, // Bordas arredondadas
    alignItems: 'center',
  },
  eventName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  eventDate: {
    color: '#fff',
    fontSize: 16,
  },
  eventTime: {
    color: '#fff',
    fontSize: 16,
  },
  button: {
    position: 'absolute',  // Posicionar o botão na parte inferior
    bottom: 20,            // Distância do fundo
    left: 10,
    right: 10,
    backgroundColor: '#FF0000',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default EventMap;
