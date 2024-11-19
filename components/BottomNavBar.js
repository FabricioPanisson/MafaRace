import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function BottomNavBar({ navigation }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handlePress = (index) => {
    setSelectedIndex(index);
    console.log(`Ícone ${index + 1} pressionado`);
  };

  // Monitora mudanças de página
  useEffect(() => {
    const unsubscribe = navigation.addListener('state', (e) => {
      const currentRoute = e.data.state.routes[e.data.state.index].name;

      // Se a página 'Home' for acessada, o ícone home ficará vermelho
      if (currentRoute === 'PageHome') {
        setSelectedIndex(0);
      }
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.navBarContainer}>
      <View style={styles.navBar}>
        {/* Botão central maior */}
        <TouchableOpacity
          style={styles.centralButton}
          onPress={() => {
            navigation.navigate('PageSignUpRace');
            handlePress(4);
          }}
        >
          <Ionicons name="stopwatch" size={36} color="white" />
        </TouchableOpacity>

        {/* Ícone lateral esquerdo (Home) */}
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => {
            navigation.navigate('PageHome');
            handlePress(0);
          }}
        >
          <Ionicons name="navigate" size={24} color={selectedIndex === 0 ? 'red' : 'white'} />
        </TouchableOpacity>

        {/* Ícone lateral direito (Event) */}
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => {
            navigation.navigate('PageEvent');
            handlePress(1);
          }}
        >
          <Ionicons name="earth" size={24} color={selectedIndex === 1 ? 'red' : 'white'} />
        </TouchableOpacity>

        {/* Ícone lateral esquerdo (Config) */}
        <TouchableOpacity
          style={[styles.iconContainer, { marginLeft: 50 }]}
          onPress={() => {
            navigation.navigate('PageConfig');
            handlePress(2);
          }}
        >
          <Ionicons name="settings" size={24} color={selectedIndex === 2 ? 'red' : 'white'} />
        </TouchableOpacity>

        {/* Ícone lateral direito (Profile) */}
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => {
            navigation.navigate('PageProfile');
            handlePress(3);
          }}
        >
          <Ionicons name="person" size={24} color={selectedIndex === 3 ? 'red' : 'white'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navBarContainer: {
    position: 'absolute',
    bottom: 60, // Eleva a barra para ficar mais alta na tela
    width: '100%',
    alignItems: 'center',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#000',
    height: 55,
    width: '80%', // Mantém a largura menor
    paddingVertical: 10,
    borderRadius: 50, // Cantos arredondados
    alignItems: 'center',
    elevation: 10, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    position: 'relative', // Mantém os elementos posicionados dentro da barra
  },
  centralButton: {
    backgroundColor: 'red',
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -40, // Eleva o botão ainda mais para evitar sobreposição
    left: '50%', // Centraliza o botão na barra
    marginLeft: -35, // Ajusta o deslocamento horizontal para alinhar o centro
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10, // Sombra para Android
  },
});
