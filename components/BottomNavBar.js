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
          onPress={() => handlePress(0)}
        >
          <Ionicons name="navigate" size={30} color={selectedIndex === 0 ? 'black' : 'white'} />
        </TouchableOpacity>
  
        <TouchableOpacity
          style={[styles.iconContainer, selectedIndex === 1 && styles.iconContainerActive]}
          onPress={() => handlePress(1)}
        >
          <Ionicons name="layers" size={30} color={selectedIndex === 1 ? 'black' : 'white'} />
        </TouchableOpacity>
  
        <TouchableOpacity
          style={[styles.iconContainer, selectedIndex === 2 && styles.iconContainerActive]}
          onPress={() => handlePress(2)}
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
    justifyContent: 'center', // Centraliza a barra de navegação verticalmente
    alignItems: 'center', // Centraliza a barra de navegação horizontalmente
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Espaço consistente entre os ícones
    width: '70%', // Torna a barra mais estreita
    backgroundColor: '#000', // Cor de fundo da barra de navegação
    borderTopWidth: 1,
    borderColor: '#ddd',
    position: 'absolute',
    bottom: 35, // Distância do fundo da tela
    paddingVertical: 5, // Reduz a altura da barra
    borderRadius: 50, // Borda arredondada
  },
  iconContainer: {
    backgroundColor: '#333', // Cor de fundo cinza para o ícone
    padding: 12, // Reduz o tamanho do botão para diminuir a altura da barra
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainerActive: {
    backgroundColor: 'red', // Cor de fundo vermelha quando o ícone está ativo
  },
});
