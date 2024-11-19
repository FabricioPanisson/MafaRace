import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import BackButton from '../components/BackButton.js';

const PageRank = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <BackButton navigation={navigation} />
      <View style={styles.titleContainer}>
            <Text style={[styles.titleRed]}>Ranking</Text>
            <Text style={styles.titleBlack}>regional</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    alignItems: 'center',
    marginHorizontal: 20, 
    marginTop: 104,
    marginRight: 122,
    marginLeft: '10%',
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
    marginTop: -20, //gambiarra
    fontWeight: 'bold',
    fontFamily: 'Montserrat-SemiBold',
    textAlign: 'center',
    color: '#1C191F',
  },
});

export default PageRank;
