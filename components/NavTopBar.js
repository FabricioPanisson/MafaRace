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
      <TouchableOpacity style={styles.ellipseIcon} onPress={() => {}}>
        <Text style={styles.iconText1}>125</Text>
      </TouchableOpacity>
      {/* Adicione mais botões ou elementos aqui */}
      <Text style={styles.iconText}>Av. Raul Sapequinha</Text>
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
  ellipseIcon: {
    backgroundColor: '#fff',
    borderRadius: 35,
    height: 25,
    width: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
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
