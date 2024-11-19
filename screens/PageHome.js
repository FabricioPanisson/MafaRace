import { StyleSheet, View } from 'react-native';
import React from 'react';
import Map from '../components/Map.js';
import BottomNavBar from '../components/BottomNavBar.js';
import NavTopBar from '../components/NavTopBar.js';
import BackButton from '../components/BackButton';

const PageHome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <BackButton navigation={navigation} />
      <Map />
      {/* Barra de navegação na parte superior */}
      <NavTopBar navigation={navigation} />
      {/* Barra de navegação na parte inferior, agora passando navigation */}
      <BottomNavBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  
});

export default PageHome;
