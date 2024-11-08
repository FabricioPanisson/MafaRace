import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function BottomNavBar({ navigation }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handlePress = (index) => {
    setSelectedIndex(index);
    console.log(`Ícone ${index + 1} pressionado`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <TouchableOpacity
          style={[styles.iconContainer, selectedIndex === 0 && styles.iconContainerActive]}
          onPress={() => {
            navigation.navigate('PageHome');
            handlePress(0);
          }}
        >
          <Ionicons name="navigate" size={30} color={selectedIndex === 0 ? 'black' : 'white'} />
        </TouchableOpacity>
  
        <TouchableOpacity
          style={[styles.iconContainer, selectedIndex === 1 && styles.iconContainerActive]}
          onPress={() => {
            navigation.navigate('PageConfig');
            handlePress(1);
          }}
        >
          <Ionicons name="layers" size={30} color={selectedIndex === 1 ? 'black' : 'white'} />
        </TouchableOpacity>
  
        <TouchableOpacity
          style={[styles.iconContainer, selectedIndex === 2 && styles.iconContainerActive]}
          onPress={() => {
            navigation.navigate('PageProfile');
            handlePress(2);
          }}
        >
          <Ionicons name="settings" size={30} color={selectedIndex === 2 ? 'black' : 'white'} />
        </TouchableOpacity>
  
        <TouchableOpacity
          style={[styles.iconContainer, selectedIndex === 3 && styles.iconContainerActive]}
          onPress={() => {
            navigation.navigate('PageProfile');
            handlePress(3);
          }}
        >
          <Ionicons name="person" size={30} color={selectedIndex === 3 ? 'black' : 'white'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '70%',
    backgroundColor: '#000',
    borderTopWidth: 1,
    borderColor: '#ddd',
    position: 'absolute',
    bottom: 35,
    paddingVertical: 5,
    borderRadius: 50,
  },
  iconContainer: {
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainerActive: {
    backgroundColor: 'red',
  },
});
