import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import React from 'react';
import BackButton from '../components/BackButton.js';

const PageProfile = ({ navigation }) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <BackButton navigation={navigation} />
        <Image 
          style={styles.profileImage}
          source={require("../assets/images/profileImage1.jpg")} 
        />
        <Image 
        style={styles.profileImage}
        source={require("../assets/images/profileImage2.jpg")} 
      />
      <Image 
        style={styles.profileImage}
        source={require("../assets/images/profileImage3.jpg")} 
      />
      </View>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  profileImage: {
    marginTop:"20%",
    maxHeight:"30%",
    maxWidth:"75%",
  },
});

export default PageProfile;
