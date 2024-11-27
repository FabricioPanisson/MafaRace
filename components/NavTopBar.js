import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import * as Location from 'expo-location';

export default function NavTopBar({ navigation }) {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [location, setLocation] = useState(null); // Armazena o endereço
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    let locationSubscription;

    async function loadFonts() {
      await Font.loadAsync({
        'Montserrat-SemiBold': require('../assets/fonts/Montserrat-SemiBold.ttf'),
      });
      setFontLoaded(true);
    }

    async function startWatchingLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permissão de localização negada.');
        return;
      }

      locationSubscription = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, distanceInterval: 10 }, // Atualiza a cada 10 metros
        async (loc) => {
          let geocode = await Location.reverseGeocodeAsync({
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
          });

          if (geocode.length > 0) {
            const address = `${geocode[0].street || 'Rua Desconhecida'} ${geocode[0].city || ''}`.trim();
            setLocation(address);
          }
        }
      );
    }

    loadFonts();
    startWatchingLocation();

    // Cleanup: cancelar a assinatura para economizar bateria
    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, []);

  if (!fontLoaded) {
    return null;
  }

  return (
    <View style={styles.topBar}>
      <View style={styles.centerTextContainer}>
        <Text style={styles.iconText}>
          {location ? location : errorMsg ? errorMsg : 'Carregando localização...'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    position: 'absolute',
    top: 40,
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 94,
    height: '6%',
    width: '70%',
    alignItems: 'center',
  },
  centerTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Montserrat-SemiBold',
    color: '#fff',
  },
});
