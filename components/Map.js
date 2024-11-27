import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Circle, Svg } from 'react-native-svg'; // Importando SVG

const Map = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [speed, setSpeed] = useState(0);

  useEffect(() => {
    const getCurrentLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permissão de localização negada');
        return;
      }

      try {
        const locationUpdates = await Location.watchPositionAsync(
          { accuracy: Location.Accuracy.High, distanceInterval: 1 },
          (newLocation) => {
            setLocation(newLocation);
            setSpeed(newLocation.coords.speed); // Atualiza a velocidade
          }
        );
      } catch (error) {
        setErrorMsg('Erro ao obter localização.');
      }
    };

    getCurrentLocation();
  }, []);

  if (errorMsg) {
    Alert.alert('Erro', errorMsg);
  }

  if (!location) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const speedInKmH = speed ? (speed * 3.6).toFixed(0) : 0; // Converte de m/s para km/h

  const maxSpeed = 220; // Velocidade máxima para o medidor (exemplo: 220 km/h)
  const speedPercentage = Math.min(speedInKmH / maxSpeed, 1); // Garante que a porcentagem não ultrapasse 100%

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation={true}
        followsUserLocation={true}
      >
      </MapView>

      {/* Medidor circular no lado direito */}
      <View style={styles.speedometerContainer}>
        <Svg width={120} height={120}>
          {/* Círculo de fundo */}
          <Circle
            cx="60"
            cy="60"
            r="55"
            stroke="rgba(255, 255, 255, 0.5)"
            strokeWidth="10"
            fill="none"
          />
          {/* Círculo da frente (indicador de velocidade) */}
          <Circle
            cx="60"
            cy="60"
            r="55"
            stroke="green"
            strokeWidth="10"
            fill="none"
            strokeDasharray={Math.PI * 2 * 55} // Comprimento total do círculo
            strokeDashoffset={Math.PI * 2 * 55 * (1 - speedPercentage)} // A porcentagem da velocidade
            strokeLinecap="round"
          />
        </Svg>
        <Text style={styles.speedText}>{speedInKmH} km/h</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  speedometerContainer: {
    position: 'absolute',
    right: 20,
    bottom: 110,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 60,
    width: 100,
    height: 100,
    padding: 10,
  },
  speedText: {
    position: 'absolute', // Fixa o texto dentro do círculo
    top: '40%',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Map;