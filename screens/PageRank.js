import { StyleSheet, View, Text, Image } from 'react-native';
import React from 'react';
import BackButton from '../components/BackButton.js';
import { BlurView } from 'expo-blur';

const PageRank = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <BackButton navigation={navigation} />
      <View style={styles.titleContainer}>
            <Text style={[styles.titleRed]}>Explore</Text>
            <Text style={styles.titleBlack}>os</Text>
            <Text style={styles.titleBlack}>eventos</Text>
      </View>
      <View style={styles.viewEvents}>
        <Image 
            source={require("../assets/images/eventoCarros1.jpg")}
            style={styles.eventImage}
        />
        <BlurView intensity={80} tint="dark" style={styles.absoluteBlur}>
          <Text style={styles.bodyText}>Nome do Evento</Text>
          <Text style={styles.bodyText}>Horário</Text>
          <Text style={styles.bodyText}>Local</Text>
        </BlurView>
      </View>
      <View style={styles.viewEvents}>
        <Image 
            source={require("../assets/images/eventoCarros2.jpg")}
            style={styles.eventImage}
        />
        <BlurView intensity={80} tint="dark" style={styles.absoluteBlur}>
          <Text style={styles.bodyText}>Nome do Evento</Text>
          <Text style={styles.bodyText}>Horário</Text>
          <Text style={styles.bodyText}>Local</Text>
        </BlurView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: "20%",
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
  },
  viewEvents: {
    position: 'relative',
    width: '90%',
    minHeight: '10%',
    borderRadius: 25,
    overflow: 'hidden',
    marginTop: '10%',
  },
  eventImage: {
    width: '100%',
    height: '100%',
    position: 'absolute'
  },
});

export default PageRank;
