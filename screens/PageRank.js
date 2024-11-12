import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import BackButton from '../components/BackButton.js';

const PageRank = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <BackButton navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PageRank;
