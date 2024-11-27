import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as Font from 'expo-font';

export default function NavTopBar({ navigation }) {

  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Montserrat-SemiBold': require('../assets/fonts/Montserrat-SemiBold.ttf'),
      });
      setFontLoaded(true);
    }

    loadFonts();
  }, []);

  if (!fontLoaded) {
    return null;
  }

  return (
    <View style={styles.topBar}>
      {/* Centralize the text by wrapping it with a View and using flex */}
      <View style={styles.centerTextContainer}>
        <Text style={styles.iconText}>Av. Raul Seixas</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    position: 'absolute',
    top: 55,
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 94,
    height: '6%',
    width: '50%',
    alignItems: 'center',
  },
  centerTextContainer: {
    flex: 1,           // Take up remaining space
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  iconText: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Montserrat-SemiBold',
    color: '#fff',
  },
  iconText1: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Montserrat-SemiBold',
    color: '#000',
  },
});
