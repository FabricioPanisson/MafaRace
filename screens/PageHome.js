import { StyleSheet, View } from 'react-native';
import React from 'react';
import Map from '../components/Map.js';
import BottomNavBar from '../components/BottomNavBar.js';
import NavTopBar from '../components/NavTopBar.js';

const PageHome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Map />
      {/* Barra de navegação na parte superior */}
      <NavTopBar navigation={navigation} />
      {/* Barra de navegação na parte inferior */}
      <BottomNavBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PageHome;
